"use client"

import { useEffect, useState } from "react"
import { getOfflineStorage } from "@/lib/offline-storage"

export function useOffline() {
  const [isOnline, setIsOnline] = useState(true)
  const [pendingOperations, setPendingOperations] = useState<any[]>([])

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => {
      console.log("[v0] Network status: Online")
      setIsOnline(true)
      syncPendingOperations()
    }

    const handleOffline = () => {
      console.log("[v0] Network status: Offline")
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Load pending operations on mount
    loadPendingOperations()

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const loadPendingOperations = async () => {
    try {
      const storage = await getOfflineStorage()
      const operations = await storage.getPendingOperations()
      setPendingOperations(operations)
    } catch (error) {
      console.error("[v0] Failed to load pending operations:", error)
    }
  }

  const syncPendingOperations = async () => {
    try {
      const storage = await getOfflineStorage()
      const operations = await storage.getPendingOperations()

      console.log(`[v0] Syncing ${operations.length} pending operations`)

      for (const operation of operations) {
        try {
          // Attempt to sync the operation
          await syncOperation(operation)
          // Remove from pending operations if successful
          await storage.removePendingOperation(operation.id)
        } catch (error) {
          console.error("[v0] Failed to sync operation:", operation, error)
          // Keep the operation in pending state for retry
        }
      }

      // Reload pending operations
      await loadPendingOperations()
    } catch (error) {
      console.error("[v0] Failed to sync pending operations:", error)
    }
  }

  const syncOperation = async (operation: any) => {
    const { database_uuid, type, table_name, data } = operation

    // This would make actual API calls to sync the data
    // For now, we'll simulate the API call
    const apiUrl = `https://api.muacodb.com/db/${database_uuid}/data`

    let response: Response

    switch (type) {
      case "create":
        response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${operation.api_key}`,
          },
          body: JSON.stringify(data),
        })
        break

      case "update":
        response = await fetch(`${apiUrl}/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${operation.api_key}`,
          },
          body: JSON.stringify(data),
        })
        break

      case "delete":
        response = await fetch(`${apiUrl}/${data.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${operation.api_key}`,
          },
        })
        break

      default:
        throw new Error(`Unknown operation type: ${type}`)
    }

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    console.log(`[v0] Successfully synced ${type} operation for ${table_name}`)
  }

  const addOfflineOperation = async (operation: {
    database_uuid: string
    type: "create" | "update" | "delete"
    table_name: string
    data: any
    api_key: string
  }) => {
    try {
      const storage = await getOfflineStorage()
      await storage.addPendingOperation(operation)
      await loadPendingOperations()
      console.log("[v0] Added offline operation:", operation)
    } catch (error) {
      console.error("[v0] Failed to add offline operation:", error)
      throw error
    }
  }

  const cacheData = async (databaseUuid: string, tableName: string, data: any[]) => {
    try {
      const storage = await getOfflineStorage()
      await storage.cacheData(databaseUuid, tableName, data)
      console.log(`[v0] Cached ${data.length} items for ${tableName}`)
    } catch (error) {
      console.error("[v0] Failed to cache data:", error)
      throw error
    }
  }

  const getCachedData = async (databaseUuid: string, tableName?: string) => {
    try {
      const storage = await getOfflineStorage()
      return await storage.getCachedData(databaseUuid, tableName)
    } catch (error) {
      console.error("[v0] Failed to get cached data:", error)
      return []
    }
  }

  const clearOfflineData = async () => {
    try {
      const storage = await getOfflineStorage()
      await storage.clearAll()
      setPendingOperations([])
      console.log("[v0] Cleared all offline data")
    } catch (error) {
      console.error("[v0] Failed to clear offline data:", error)
      throw error
    }
  }

  return {
    isOnline,
    pendingOperations,
    addOfflineOperation,
    cacheData,
    getCachedData,
    syncPendingOperations,
    clearOfflineData,
  }
}
