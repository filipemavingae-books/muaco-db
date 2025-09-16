// IndexedDB wrapper for offline data storage
export class OfflineStorage {
  private dbName = "muacodb-offline"
  private version = 1
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => {
        console.error("[v0] Failed to open IndexedDB:", request.error)
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        console.log("[v0] IndexedDB opened successfully")
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains("cached_data")) {
          const dataStore = db.createObjectStore("cached_data", { keyPath: "id" })
          dataStore.createIndex("database_uuid", "database_uuid", { unique: false })
          dataStore.createIndex("table_name", "table_name", { unique: false })
          dataStore.createIndex("timestamp", "timestamp", { unique: false })
        }

        if (!db.objectStoreNames.contains("pending_operations")) {
          const operationsStore = db.createObjectStore("pending_operations", { keyPath: "id" })
          operationsStore.createIndex("database_uuid", "database_uuid", { unique: false })
          operationsStore.createIndex("timestamp", "timestamp", { unique: false })
        }

        if (!db.objectStoreNames.contains("sync_metadata")) {
          db.createObjectStore("sync_metadata", { keyPath: "key" })
        }

        console.log("[v0] IndexedDB schema created/updated")
      }
    })
  }

  // Cache data for offline access
  async cacheData(databaseUuid: string, tableName: string, data: any[]): Promise<void> {
    if (!this.db) throw new Error("Database not initialized")

    const transaction = this.db.transaction(["cached_data"], "readwrite")
    const store = transaction.objectStore("cached_data")

    // Clear existing data for this table
    const index = store.index("database_uuid")
    const range = IDBKeyRange.only(databaseUuid)
    const deleteRequest = index.openCursor(range)

    deleteRequest.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result
      if (cursor) {
        if (cursor.value.table_name === tableName) {
          cursor.delete()
        }
        cursor.continue()
      }
    }

    // Add new data
    data.forEach((item, index) => {
      const cacheItem = {
        id: `${databaseUuid}_${tableName}_${item.id || index}`,
        database_uuid: databaseUuid,
        table_name: tableName,
        data: item,
        timestamp: Date.now(),
      }
      store.add(cacheItem)
    })

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log(`[v0] Cached ${data.length} items for ${tableName}`)
        resolve()
      }
      transaction.onerror = () => reject(transaction.error)
    })
  }

  // Get cached data
  async getCachedData(databaseUuid: string, tableName?: string): Promise<any[]> {
    if (!this.db) throw new Error("Database not initialized")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["cached_data"], "readonly")
      const store = transaction.objectStore("cached_data")
      const index = store.index("database_uuid")
      const range = IDBKeyRange.only(databaseUuid)
      const request = index.getAll(range)

      request.onsuccess = () => {
        let results = request.result
        if (tableName) {
          results = results.filter((item) => item.table_name === tableName)
        }
        const data = results.map((item) => item.data)
        console.log(`[v0] Retrieved ${data.length} cached items`)
        resolve(data)
      }

      request.onerror = () => reject(request.error)
    })
  }

  // Store pending operations for sync when online
  async addPendingOperation(operation: {
    database_uuid: string
    type: "create" | "update" | "delete"
    table_name: string
    data: any
    original_id?: string
  }): Promise<void> {
    if (!this.db) throw new Error("Database not initialized")

    const operationWithId = {
      ...operation,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["pending_operations"], "readwrite")
      const store = transaction.objectStore("pending_operations")
      const request = store.add(operationWithId)

      request.onsuccess = () => {
        console.log("[v0] Added pending operation:", operationWithId)
        resolve()
      }
      request.onerror = () => reject(request.error)
    })
  }

  // Get pending operations for sync
  async getPendingOperations(databaseUuid?: string): Promise<any[]> {
    if (!this.db) throw new Error("Database not initialized")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["pending_operations"], "readonly")
      const store = transaction.objectStore("pending_operations")

      let request: IDBRequest
      if (databaseUuid) {
        const index = store.index("database_uuid")
        request = index.getAll(IDBKeyRange.only(databaseUuid))
      } else {
        request = store.getAll()
      }

      request.onsuccess = () => {
        console.log(`[v0] Retrieved ${request.result.length} pending operations`)
        resolve(request.result)
      }
      request.onerror = () => reject(request.error)
    })
  }

  // Remove pending operation after successful sync
  async removePendingOperation(operationId: string): Promise<void> {
    if (!this.db) throw new Error("Database not initialized")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["pending_operations"], "readwrite")
      const store = transaction.objectStore("pending_operations")
      const request = store.delete(operationId)

      request.onsuccess = () => {
        console.log("[v0] Removed pending operation:", operationId)
        resolve()
      }
      request.onerror = () => reject(request.error)
    })
  }

  // Store sync metadata
  async setSyncMetadata(key: string, value: any): Promise<void> {
    if (!this.db) throw new Error("Database not initialized")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["sync_metadata"], "readwrite")
      const store = transaction.objectStore("sync_metadata")
      const request = store.put({ key, value, timestamp: Date.now() })

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // Get sync metadata
  async getSyncMetadata(key: string): Promise<any> {
    if (!this.db) throw new Error("Database not initialized")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["sync_metadata"], "readonly")
      const store = transaction.objectStore("sync_metadata")
      const request = store.get(key)

      request.onsuccess = () => {
        resolve(request.result?.value || null)
      }
      request.onerror = () => reject(request.error)
    })
  }

  // Clear all offline data
  async clearAll(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized")

    const storeNames = ["cached_data", "pending_operations", "sync_metadata"]
    const transaction = this.db.transaction(storeNames, "readwrite")

    storeNames.forEach((storeName) => {
      transaction.objectStore(storeName).clear()
    })

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log("[v0] Cleared all offline data")
        resolve()
      }
      transaction.onerror = () => reject(transaction.error)
    })
  }
}

// Global instance
let offlineStorage: OfflineStorage | null = null

export async function getOfflineStorage(): Promise<OfflineStorage> {
  if (!offlineStorage) {
    offlineStorage = new OfflineStorage()
    await offlineStorage.init()
  }
  return offlineStorage
}
