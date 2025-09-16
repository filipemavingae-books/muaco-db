"use client"

import { useWebSocket } from "@/hooks/use-websocket"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Loader2 } from "lucide-react"

interface WebSocketStatusProps {
  apiKey?: string
  className?: string
}

export function WebSocketStatus({ apiKey, className }: WebSocketStatusProps) {
  const { connectionState, isConnected } = useWebSocket({
    apiKey,
    autoConnect: !!apiKey,
  })

  const getStatusIcon = () => {
    switch (connectionState) {
      case "connected":
        return <Wifi className="h-3 w-3" />
      case "connecting":
        return <Loader2 className="h-3 w-3 animate-spin" />
      case "disconnected":
      case "error":
        return <WifiOff className="h-3 w-3" />
      default:
        return <WifiOff className="h-3 w-3" />
    }
  }

  const getStatusText = () => {
    switch (connectionState) {
      case "connected":
        return "Online"
      case "connecting":
        return "Conectando"
      case "disconnected":
        return "Offline"
      case "error":
        return "Erro"
      default:
        return "Desconhecido"
    }
  }

  const getStatusVariant = () => {
    switch (connectionState) {
      case "connected":
        return "default" as const
      case "connecting":
        return "secondary" as const
      case "disconnected":
      case "error":
        return "destructive" as const
      default:
        return "secondary" as const
    }
  }

  if (!apiKey) {
    return null
  }

  return (
    <Badge variant={getStatusVariant()} className={className}>
      {getStatusIcon()}
      <span className="ml-1 text-xs">{getStatusText()}</span>
    </Badge>
  )
}
