"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Shield, ShieldOff } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface User {
  id: string
  email: string
  name: string
  plan: string
  role: string
  createdAt: string
  databases: number
}

interface UsersTableProps {
  users: User[]
  onUpdateUser?: (userId: string, updates: Partial<User>) => void
}

export function UsersTable({ users, onUpdateUser }: UsersTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case "free":
        return "bg-gray-100 text-gray-800"
      case "basic":
        return "bg-blue-100 text-blue-800"
      case "pro":
        return "bg-[#8B5E3C] text-white"
      case "enterprise":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleToggleAdmin = (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin"
    onUpdateUser?.(userId, { role: newRole })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestão de Usuários</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Bases de Dados</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="w-[50px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={getPlanBadgeColor(user.plan)}>{user.plan}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {user.role === "admin" ? (
                      <Shield className="h-4 w-4 text-[#8B5E3C]" />
                    ) : (
                      <ShieldOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="capitalize">{user.role}</span>
                  </div>
                </TableCell>
                <TableCell>{user.databases}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString("pt-PT")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleToggleAdmin(user.id, user.role)}>
                        {user.role === "admin" ? "Remover Admin" : "Tornar Admin"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Suspender Usuário</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
