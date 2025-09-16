"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { DatabaseList } from "@/components/dashboard/database-list"
import { PlanUsage } from "@/components/dashboard/plan-usage"
import { Button } from "@/components/ui/button"
import { Plus, LogOut } from "lucide-react"

interface DatabaseItem {
  id: string
  name: string
  uuid: string
  apiKey: string
  apiLink: string
  createdAt: string
  recordCount: number
}

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [databases, setDatabases] = useState<DatabaseItem[]>([])
  const [stats, setStats] = useState({
    databases: 0,
    apiCalls: 1250,
    totalUsers: 15420,
    uptime: "99.9%",
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }

    // Simular dados das bases de dados do usuário
    if (user) {
      const mockDatabases: DatabaseItem[] = [
        {
          id: "1",
          name: "Minha Primeira DB",
          uuid: "550e8400-e29b-41d4-a716-446655440000",
          apiKey: "sk_live_abcd1234efgh5678",
          apiLink: "https://api.muacodb.com/db/550e8400-e29b-41d4-a716-446655440000",
          createdAt: "2024-01-15T10:30:00Z",
          recordCount: 125,
        },
        {
          id: "2",
          name: "Dados de Clientes",
          uuid: "123e4567-e89b-12d3-a456-426614174000",
          apiKey: "sk_live_xyz9876543210abc",
          apiLink: "https://api.muacodb.com/db/123e4567-e89b-12d3-a456-426614174000",
          createdAt: "2024-02-01T14:20:00Z",
          recordCount: 89,
        },
      ]

      setDatabases(mockDatabases)
      setStats((prev) => ({ ...prev, databases: mockDatabases.length }))
    }
  }, [user, isLoading, router])

  const handleDeleteDatabase = (uuid: string) => {
    setDatabases((prev) => prev.filter((db) => db.uuid !== uuid))
    setStats((prev) => ({ ...prev, databases: prev.databases - 1 }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const planLimits = {
    free: { databases: 1, storage: 100 * 1024 * 1024, apiCalls: 1000 },
    basic: { databases: 5, storage: 2 * 1024 * 1024 * 1024, apiCalls: 50000 },
    pro: { databases: 20, storage: 20 * 1024 * 1024 * 1024, apiCalls: 1000000 },
    enterprise: { databases: -1, storage: -1, apiCalls: -1 },
  }

  const currentLimits = planLimits[user.plan]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Bem-vindo de volta, {user.name}!</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Base de Dados
              </Button>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-8">
            <StatsCards {...stats} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Databases List */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Suas Bases de Dados</h2>
              <DatabaseList databases={databases} onDelete={handleDeleteDatabase} />
            </div>

            {/* Plan Usage */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Uso do Plano</h2>
              <PlanUsage
                plan={user.plan}
                databases={{ used: databases.length, limit: currentLimits.databases }}
                storage={{ used: 50 * 1024 * 1024, limit: currentLimits.storage }}
                apiCalls={{ used: stats.apiCalls, limit: currentLimits.apiCalls }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
