// Simulação de base de dados em memória para demonstração
// Em produção, usar PostgreSQL ou SQL Server real

import { v4 as uuidv4 } from "uuid"
import crypto from "crypto"

export interface DatabaseUser {
  id: string
  email: string
  name: string
  password: string
  plan: "free" | "basic" | "pro" | "enterprise"
  createdAt: Date
  databases: DatabaseInstance[]
}

export interface DatabaseInstance {
  id: string
  name: string
  uuid: string
  apiKey: string
  apiLink: string
  userId: string
  createdAt: Date
  data: Record<string, any>[]
}

// Simulação de armazenamento em memória
const users: DatabaseUser[] = []
const databases: DatabaseInstance[] = []

export const db = {
  users: {
    async create(userData: Omit<DatabaseUser, "id" | "createdAt" | "databases">): Promise<DatabaseUser> {
      const user: DatabaseUser = {
        ...userData,
        id: generateId(),
        createdAt: new Date(),
        databases: [],
      }
      users.push(user)
      return user
    },

    async findByEmail(email: string): Promise<DatabaseUser | null> {
      return users.find((user) => user.email === email) || null
    },

    async findById(id: string): Promise<DatabaseUser | null> {
      return users.find((user) => user.id === id) || null
    },

    async update(id: string, updates: Partial<DatabaseUser>): Promise<DatabaseUser | null> {
      const userIndex = users.findIndex((user) => user.id === id)
      if (userIndex === -1) return null

      users[userIndex] = { ...users[userIndex], ...updates }
      return users[userIndex]
    },
  },

  databases: {
    async create(
      dbData: Omit<DatabaseInstance, "id" | "createdAt" | "data" | "uuid" | "apiKey" | "apiLink">,
    ): Promise<DatabaseInstance> {
      const uuid = uuidv4()
      const apiKey = generateApiKey()
      const apiLink = `https://api.muacodb.com/db/${uuid}`

      const database: DatabaseInstance = {
        ...dbData,
        id: generateId(),
        uuid,
        apiKey,
        apiLink,
        createdAt: new Date(),
        data: [],
      }
      databases.push(database)
      return database
    },

    async findByUserId(userId: string): Promise<DatabaseInstance[]> {
      return databases.filter((db) => db.userId === userId)
    },

    async findByUuid(uuid: string): Promise<DatabaseInstance | null> {
      return databases.find((db) => db.uuid === uuid) || null
    },

    async update(uuid: string, updates: Partial<DatabaseInstance>): Promise<DatabaseInstance | null> {
      const dbIndex = databases.findIndex((db) => db.uuid === uuid)
      if (dbIndex === -1) return null

      databases[dbIndex] = { ...databases[dbIndex], ...updates }
      return databases[dbIndex]
    },

    async delete(uuid: string): Promise<boolean> {
      const dbIndex = databases.findIndex((db) => db.uuid === uuid)
      if (dbIndex === -1) return false

      databases.splice(dbIndex, 1)
      return true
    },

    async insertData(uuid: string, data: Record<string, any>): Promise<Record<string, any> | null> {
      const database = databases.find((db) => db.uuid === uuid)
      if (!database) return null

      const record = {
        id: generateId(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      database.data.push(record)
      return record
    },

    async getData(uuid: string, limit?: number, offset?: number): Promise<Record<string, any>[]> {
      const database = databases.find((db) => db.uuid === uuid)
      if (!database) return []

      let data = database.data
      if (offset) data = data.slice(offset)
      if (limit) data = data.slice(0, limit)

      return data
    },

    async updateData(
      uuid: string,
      recordId: string,
      updates: Record<string, any>,
    ): Promise<Record<string, any> | null> {
      const database = databases.find((db) => db.uuid === uuid)
      if (!database) return null

      const recordIndex = database.data.findIndex((record) => record.id === recordId)
      if (recordIndex === -1) return null

      database.data[recordIndex] = {
        ...database.data[recordIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      return database.data[recordIndex]
    },

    async deleteData(uuid: string, recordId: string): Promise<boolean> {
      const database = databases.find((db) => db.uuid === uuid)
      if (!database) return false

      const recordIndex = database.data.findIndex((record) => record.id === recordId)
      if (recordIndex === -1) return false

      database.data.splice(recordIndex, 1)
      return true
    },
  },
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

function generateApiKey(): string {
  const prefix = "sk_live_"
  const randomBytes = crypto.randomBytes(24).toString("hex")
  return prefix + randomBytes
}
