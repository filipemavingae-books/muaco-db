"use client"

import { useOffline } from "@/hooks/use-offline"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, WifiOff, RefreshCw, Clock, AlertCircle } from "lucide-react"

interface OfflineIndicatorProps {
  className?: string
  showDetails?: boolean
}

export function OfflineIndicator({ className, showDetails = false }: OfflineIndicatorProps) {
  const { isOnline, pendingOperations, syncPendingOperations } = useOffline()

  if (showDetails) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {isOnline ? <Wifi className="h-5 w-5 text-green-500" /> : <WifiOff className="h-5 w-5 text-red-500" />}
            <span>Status da Conexão</span>
          </CardTitle>
          <CardDescription>
            {isOnline ? "Conectado à internet" : "Modo offline - dados serão sincronizados quando voltar online"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Status:</span>
              <Badge variant={isOnline ? "default" : "destructive"}>{isOnline ? "Online" : "Offline"}</Badge>
            </div>

            {pendingOperations.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Operações pendentes:</span>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{pendingOperations.length}</span>
                  </Badge>
                </div>

                <div className="space-y-2">
                  {pendingOperations.slice(0, 3).map((operation) => (
                    <div key={operation.id} className="text-xs bg-muted p-2 rounded">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {operation.type}
                        </Badge>
                        <span>{operation.table_name}</span>
                      </div>
                    </div>
                  ))}
                  {pendingOperations.length > 3 && (
                    <p className="text-xs text-muted-foreground">+{pendingOperations.length - 3} mais operações...</p>
                  )}
                </div>

                {isOnline && (
                  <Button size="sm" onClick={syncPendingOperations} className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sincronizar Agora
                  </Button>
                )}
              </>
            )}

            {!isOnline && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-xs text-yellow-700">
                    <p className="font-medium">Modo Offline Ativo</p>
                    <p>Suas alterações serão salvas localmente e sincronizadas quando a conexão retornar.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Badge variant={isOnline ? "default" : "destructive"} className={className}>
      {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
      <span className="ml-1 text-xs">
        {isOnline ? "Online" : "Offline"}
        {pendingOperations.length > 0 && ` (${pendingOperations.length})`}
      </span>
    </Badge>
  )
}
