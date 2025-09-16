"use client"

import { useEffect, useRef, useState } from "react"
import { getWebSocketInstance, disconnectWebSocket, type MuacoDBWebSocket } from "@/lib/websocket"

interface UseWebSocketOptions {
  apiKey?: string
  autoConnect?: boolean
  onConnect?: () => void
  onDisconnect?: (event: { code: number; reason: string }) => void
  onError?: (error: any) => void
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { apiKey, autoConnect = true, onConnect, onDisconnect, onError } = options
  const [connectionState, setConnectionState] = useState<string>("disconnected")
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<MuacoDBWebSocket | null>(null)

  useEffect(() => {
    if (!apiKey || !autoConnect) return

    const ws = getWebSocketInstance(apiKey)
    if (!ws) return

    wsRef.current = ws

    // Set up event listeners
    const handleConnect = () => {
      setConnectionState("connected")
      setIsConnected(true)
      onConnect?.()
    }

    const handleDisconnect = (event: { code: number; reason: string }) => {
      setConnectionState("disconnected")
      setIsConnected(false)
      onDisconnect?.(event)
    }

    const handleError = (error: any) => {
      setConnectionState("error")
      setIsConnected(false)
      onError?.(error)
    }

    ws.on("connected", handleConnect)
    ws.on("disconnected", handleDisconnect)
    ws.on("error", handleError)

    // Connect
    ws.connect().catch((error) => {
      console.error("[v0] Failed to connect WebSocket:", error)
      setConnectionState("error")
    })

    // Update connection state periodically
    const stateInterval = setInterval(() => {
      setConnectionState(ws.connectionState)
      setIsConnected(ws.isConnected)
    }, 1000)

    return () => {
      clearInterval(stateInterval)
      ws.off("connected", handleConnect)
      ws.off("disconnected", handleDisconnect)
      ws.off("error", handleError)
    }
  }, [apiKey, autoConnect, onConnect, onDisconnect, onError])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        disconnectWebSocket()
      }
    }
  }, [])

  const connect = async () => {
    if (!apiKey) {
      throw new Error("API key is required to connect")
    }

    const ws = getWebSocketInstance(apiKey)
    if (ws) {
      await ws.connect()
    }
  }

  const disconnect = () => {
    disconnectWebSocket()
    setConnectionState("disconnected")
    setIsConnected(false)
  }

  const send = (type: string, payload: any) => {
    const ws = getWebSocketInstance()
    if (ws) {
      ws.send(type, payload)
    }
  }

  const subscribeToDatabase = (databaseUuid: string) => {
    const ws = getWebSocketInstance()
    if (ws) {
      ws.subscribeToDatabase(databaseUuid)
    }
  }

  const unsubscribeFromDatabase = (databaseUuid: string) => {
    const ws = getWebSocketInstance()
    if (ws) {
      ws.unsubscribeFromDatabase(databaseUuid)
    }
  }

  const on = (event: string, callback: Function) => {
    const ws = getWebSocketInstance()
    if (ws) {
      ws.on(event, callback)
    }
  }

  const off = (event: string, callback: Function) => {
    const ws = getWebSocketInstance()
    if (ws) {
      ws.off(event, callback)
    }
  }

  return {
    connectionState,
    isConnected,
    connect,
    disconnect,
    send,
    subscribeToDatabase,
    unsubscribeFromDatabase,
    on,
    off,
  }
}
