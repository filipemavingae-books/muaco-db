// WebSocket client for real-time communication
export class MuacoDBWebSocket {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private listeners: Map<string, Set<Function>> = new Map()
  private isConnecting = false

  constructor(
    private url: string,
    private apiKey: string,
  ) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        resolve()
        return
      }

      if (this.isConnecting) {
        return
      }

      this.isConnecting = true

      try {
        // Add API key as query parameter for authentication
        const wsUrl = `${this.url}?apiKey=${encodeURIComponent(this.apiKey)}`
        this.ws = new WebSocket(wsUrl)

        this.ws.onopen = () => {
          console.log("[v0] WebSocket connected")
          this.isConnecting = false
          this.reconnectAttempts = 0
          this.emit("connected", {})
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            console.log("[v0] WebSocket message received:", data)
            this.emit(data.type, data.payload)
          } catch (error) {
            console.error("[v0] Error parsing WebSocket message:", error)
          }
        }

        this.ws.onclose = (event) => {
          console.log("[v0] WebSocket disconnected:", event.code, event.reason)
          this.isConnecting = false
          this.emit("disconnected", { code: event.code, reason: event.reason })

          // Attempt to reconnect if not a normal closure
          if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.scheduleReconnect()
          }
        }

        this.ws.onerror = (error) => {
          console.error("[v0] WebSocket error:", error)
          this.isConnecting = false
          this.emit("error", error)
          reject(error)
        }
      } catch (error) {
        this.isConnecting = false
        reject(error)
      }
    })
  }

  private scheduleReconnect() {
    this.reconnectAttempts++
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)

    console.log(`[v0] Scheduling reconnect attempt ${this.reconnectAttempts} in ${delay}ms`)

    setTimeout(() => {
      this.connect().catch((error) => {
        console.error("[v0] Reconnect failed:", error)
      })
    }, delay)
  }

  disconnect() {
    if (this.ws) {
      this.ws.close(1000, "Client disconnect")
      this.ws = null
    }
  }

  send(type: string, payload: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ type, payload })
      this.ws.send(message)
      console.log("[v0] WebSocket message sent:", { type, payload })
    } else {
      console.warn("[v0] WebSocket not connected, message not sent:", { type, payload })
    }
  }

  // Subscribe to database changes
  subscribeToDatabase(databaseUuid: string) {
    this.send("subscribe", { database: databaseUuid })
  }

  // Unsubscribe from database changes
  unsubscribeFromDatabase(databaseUuid: string) {
    this.send("unsubscribe", { database: databaseUuid })
  }

  // Event listener management
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback)
  }

  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.delete(callback)
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach((callback) => {
        try {
          callback(data)
        } catch (error) {
          console.error("[v0] Error in WebSocket event callback:", error)
        }
      })
    }
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }

  get connectionState(): string {
    if (!this.ws) return "disconnected"

    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return "connecting"
      case WebSocket.OPEN:
        return "connected"
      case WebSocket.CLOSING:
        return "closing"
      case WebSocket.CLOSED:
        return "disconnected"
      default:
        return "unknown"
    }
  }
}

// Global WebSocket instance
let globalWebSocket: MuacoDBWebSocket | null = null

export function getWebSocketInstance(apiKey?: string): MuacoDBWebSocket | null {
  if (!globalWebSocket && apiKey) {
    // Use environment variable or fallback to localhost for development
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080/ws"
    globalWebSocket = new MuacoDBWebSocket(wsUrl, apiKey)
  }
  return globalWebSocket
}

export function disconnectWebSocket() {
  if (globalWebSocket) {
    globalWebSocket.disconnect()
    globalWebSocket = null
  }
}
