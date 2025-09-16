"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UsersTable } from "@/components/admin/users-table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  plan: string
  role: string
  createdAt: string
  databases: number
}

export default function AdminUsersPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/dashboard")
      return
    }

    // Mock users data - in real app, fetch from API
    if (user?.role === "admin") {
      setUsers([
        {
          id: "1",
          email: "isaac@example.com",
          name: "Isaac Silva",
          plan: "pro",
          role: "user",
          createdAt: "2024-01-15T10:30:00Z",
          databases: 3,
        },
        {
          id: "2",
          email: "maria@example.com",
          name: "Maria Santos",
          plan: "basic",
          role: "user",
          createdAt: "2024-02-01T14:20:00Z",
          databases: 2,
        },
        {
          id: "3",
          email: "admin@muacodb.com",
          name: "Admin User",
          plan: "enterprise",
          role: "admin",
          createdAt: "2024-01-01T00:00:00Z",
          databases: 0,
        },
      ])
    }
  }, [user, isLoading, router])

  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, ...updates } : u)))
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

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/admin")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Admin
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Gestão de Usuários</h1>
              <p className="text-muted-foreground">Gerir todos os usuários da plataforma</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Usuário
            </Button>
          </div>
        </div>

        <UsersTable users={users} onUpdateUser={handleUpdateUser} />
      </div>
    </div>
  )
}
