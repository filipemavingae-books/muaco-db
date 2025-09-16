"use client"

import { useEffect, useState } from "react"
import { useWebSocket } from "@/hooks/use-websocket"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Database, RefreshCw } from "lucide-react"

interface RealTimeDataProps {
  databaseUuid: string
  apiKey: string
}

interface DataChange {
  id: string
  type: "insert" | "update" | "delete"
  table: string
  data: any
  timestamp: string
}

export function RealTimeData({ databaseUuid, apiKey }: RealTimeDataProps) {
  const [changes, setChanges] = useState<DataChange[]>([])
  const [isSubscribed, setIsSubscribed] = useState(false)

  const { isConnected, subscribeToDatabase, unsubscribeFromDatabase, on, off } = useWebSocket({
    apiKey,
    autoConnect: true,
  })

  useEffect(() => {
    if (!isConnected) return

    const handleDataChange = (change: DataChange) => {
      console.log("[v0] Real-time data change received:", change)
      setChanges((prev) => [change, ...prev.slice(0, 49)]) // Keep last 50 changes
    }

    // Subscribe to data changes
    on("data_change", handleDataChange)

    return () => {
      off("data_change", handleDataChange)
    }
  }, [isConnected, on, off])

  const handleSubscribe = () => {
    if (isConnected) {
      subscribeToDatabase(databaseUuid)
      setIsSubscribed(true)
    }
  }

  const handleUnsubscribe = () => {
    if (isConnected) {
      unsubscribeFromDatabase(databaseUuid)
      setIsSubscribed(false)
    }
  }

  const clearChanges = () => {
    setChanges([])
  }

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case "insert":
        return "bg-green-100 text-green-800 border-green-200"
      case "update":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "delete":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Dados em Tempo Real</span>
            </CardTitle>
            <CardDescription>Alterações na base de dados em tempo real via WebSocket</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <>
                {!isSubscribed ? (
                  <Button size="sm" onClick={handleSubscribe}>
                    <Database className="h-4 w-4 mr-2" />
                    Subscrever
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={handleUnsubscribe}>
                    Cancelar Subscrição
                  </Button>
                )}
              </>
            ) : (
              <Badge variant="destructive">Desconectado</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!isConnected && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              WebSocket desconectado. Conecte-se para ver alterações em tempo real.
            </p>
          </div>
        )}

        {isConnected && !isSubscribed && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Clique em "Subscrever" para começar a receber alterações em tempo real.
            </p>
          </div>
        )}

        {isConnected && isSubscribed && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {changes.length === 0 ? "Aguardando alterações..." : `${changes.length} alterações recentes`}
              </p>
              {changes.length > 0 && (
                <Button size="sm" variant="ghost" onClick={clearChanges}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Limpar
                </Button>
              )}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {changes.map((change) => (
                <div key={change.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getChangeTypeColor(change.type)}>
                        {change.type === "insert" && "Inserir"}
                        {change.type === "update" && "Atualizar"}
                        {change.type === "delete" && "Eliminar"}
                      </Badge>
                      <span className="text-sm font-medium">{change.table}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatTimestamp(change.timestamp)}</span>
                  </div>
                  <div className="text-xs bg-muted p-2 rounded overflow-x-auto">
                    <pre>{JSON.stringify(change.data, null, 2)}</pre>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
