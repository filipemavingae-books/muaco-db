"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminStats } from "@/components/admin/admin-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDatabases: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
  })

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/dashboard")
      return
    }

    // Fetch admin stats
    if (user?.role === "admin") {
      // Mock data - in real app, fetch from API
      setStats({
        totalUsers: 1247,
        totalDatabases: 3891,
        totalRevenue: 125000,
        monthlyGrowth: 15,
      })
    }
  }, [user, isLoading, router])

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

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>

          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da plataforma MuacoDB</p>
        </div>

        <div className="space-y-8">
          <AdminStats {...stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Novo usuário registrado</p>
                      <p className="text-sm text-muted-foreground">isaac@example.com</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2 min atrás</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Base de dados criada</p>
                      <p className="text-sm text-muted-foreground">API de Produtos</p>
                    </div>
                    <span className="text-sm text-muted-foreground">5 min atrás</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pagamento processado</p>
                      <p className="text-sm text-muted-foreground">Plano Pro - 5000 AOA</p>
                    </div>
                    <span className="text-sm text-muted-foreground">1 hora atrás</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Usuários Ativos (24h)</span>
                    <span className="font-medium">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span>APIs Chamadas (hoje)</span>
                    <span className="font-medium">45,231</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime</span>
                    <span className="font-medium text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Novos Registros (semana)</span>
                    <span className="font-medium">127</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
