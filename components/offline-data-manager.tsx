"use client"

import { useEffect, useState } from "react"
import { useOffline } from "@/hooks/use-offline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Database, Plus, Edit, Trash2, Save, RefreshCw } from "lucide-react"

interface OfflineDataManagerProps {
  databaseUuid: string
  tableName: string
  apiKey: string
}

export function OfflineDataManager({ databaseUuid, tableName, apiKey }: OfflineDataManagerProps) {
  const { isOnline, addOfflineOperation, cacheData, getCachedData } = useOffline()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [newItem, setNewItem] = useState({ name: "", description: "" })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [databaseUuid, tableName])

  const loadData = async () => {
    setIsLoading(true)
    try {
      if (isOnline) {
        // Try to fetch from API first
        const response = await fetch(`https://api.muacodb.com/db/${databaseUuid}/data`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })

        if (response.ok) {
          const apiData = await response.json()
          setData(apiData)
          // Cache the data for offline use
          await cacheData(databaseUuid, tableName, apiData)
        } else {
          throw new Error("API request failed")
        }
      } else {
        // Load from cache when offline
        const cachedData = await getCachedData(databaseUuid, tableName)
        setData(cachedData)
      }
    } catch (error) {
      console.error("[v0] Failed to load data:", error)
      // Fallback to cached data
      const cachedData = await getCachedData(databaseUuid, tableName)
      setData(cachedData)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!newItem.name.trim()) return

    const item = {
      id: `temp_${Date.now()}`, // Temporary ID for offline
      ...newItem,
      created_at: new Date().toISOString(),
    }

    // Add to local state immediately
    setData((prev) => [item, ...prev])
    setNewItem({ name: "", description: "" })

    try {
      if (isOnline) {
        // Try to create online
        const response = await fetch(`https://api.muacodb.com/db/${databaseUuid}/data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(newItem),
        })

        if (response.ok) {
          const createdItem = await response.json()
          // Update with real ID from server
          setData((prev) => prev.map((i) => (i.id === item.id ? createdItem : i)))
        } else {
          throw new Error("API request failed")
        }
      } else {
        // Store for offline sync
        await addOfflineOperation({
          database_uuid: databaseUuid,
          type: "create",
          table_name: tableName,
          data: newItem,
          api_key: apiKey,
        })
      }
    } catch (error) {
      console.error("[v0] Failed to create item:", error)
      // Store for offline sync
      await addOfflineOperation({
        database_uuid: databaseUuid,
        type: "create",
        table_name: tableName,
        data: newItem,
        api_key: apiKey,
      })
    }
  }

  const handleUpdate = async (id: string, updatedData: any) => {
    // Update local state immediately
    setData((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item)))
    setEditingId(null)

    try {
      if (isOnline) {
        // Try to update online
        const response = await fetch(`https://api.muacodb.com/db/${databaseUuid}/data/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(updatedData),
        })

        if (!response.ok) {
          throw new Error("API request failed")
        }
      } else {
        // Store for offline sync
        await addOfflineOperation({
          database_uuid: databaseUuid,
          type: "update",
          table_name: tableName,
          data: { id, ...updatedData },
          api_key: apiKey,
        })
      }
    } catch (error) {
      console.error("[v0] Failed to update item:", error)
      // Store for offline sync
      await addOfflineOperation({
        database_uuid: databaseUuid,
        type: "update",
        table_name: tableName,
        data: { id, ...updatedData },
        api_key: apiKey,
      })
    }
  }

  const handleDelete = async (id: string) => {
    // Remove from local state immediately
    setData((prev) => prev.filter((item) => item.id !== id))

    try {
      if (isOnline) {
        // Try to delete online
        const response = await fetch(`https://api.muacodb.com/db/${databaseUuid}/data/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })

        if (!response.ok) {
          throw new Error("API request failed")
        }
      } else {
        // Store for offline sync
        await addOfflineOperation({
          database_uuid: databaseUuid,
          type: "delete",
          table_name: tableName,
          data: { id },
          api_key: apiKey,
        })
      }
    } catch (error) {
      console.error("[v0] Failed to delete item:", error)
      // Store for offline sync
      await addOfflineOperation({
        database_uuid: databaseUuid,
        type: "delete",
        table_name: tableName,
        data: { id },
        api_key: apiKey,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-primary" />
              <span>Gestão de Dados Offline</span>
            </CardTitle>
            <CardDescription>Funciona online e offline com sincronização automática</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isOnline ? "default" : "secondary"}>{isOnline ? "Online" : "Offline"}</Badge>
            <Button size="sm" onClick={loadData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Item */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">Adicionar Novo Item</h4>
          <div className="space-y-3">
            <Input
              placeholder="Nome"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <Textarea
              placeholder="Descrição"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
            <Button onClick={handleCreate} disabled={!newItem.name.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>

        {/* Data List */}
        <div className="space-y-3">
          <h4 className="font-medium">Dados ({data.length} itens)</h4>
          {data.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {isLoading ? "Carregando..." : "Nenhum item encontrado"}
            </div>
          ) : (
            data.map((item) => (
              <div key={item.id} className="border rounded-lg p-3">
                {editingId === item.id ? (
                  <EditForm
                    item={item}
                    onSave={(updatedData) => handleUpdate(item.id, updatedData)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">{item.name}</h5>
                      {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                      <p className="text-xs text-muted-foreground">
                        {item.id.startsWith("temp_") && (
                          <Badge variant="outline" className="mr-2">
                            Pendente
                          </Badge>
                        )}
                        {item.created_at && new Date(item.created_at).toLocaleString("pt-PT")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(item.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function EditForm({
  item,
  onSave,
  onCancel,
}: {
  item: any
  onSave: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: item.name || "",
    description: item.description || "",
  })

  const handleSave = () => {
    onSave(formData)
  }

  return (
    <div className="space-y-3">
      <Input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Nome"
      />
      <Textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Descrição"
      />
      <div className="flex items-center space-x-2">
        <Button size="sm" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}
