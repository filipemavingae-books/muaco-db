"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Database, CreditCard, TrendingUp } from "lucide-react"

interface AdminStatsProps {
  totalUsers: number
  totalDatabases: number
  totalRevenue: number
  monthlyGrowth: number
}

export function AdminStats({ totalUsers, totalDatabases, totalRevenue, monthlyGrowth }: AdminStatsProps) {
  const stats = [
    {
      title: "Total de Usuários",
      value: totalUsers.toLocaleString(),
      icon: Users,
      change: "+12%",
    },
    {
      title: "Bases de Dados",
      value: totalDatabases.toLocaleString(),
      icon: Database,
      change: "+8%",
    },
    {
      title: "Receita (AOA)",
      value: totalRevenue.toLocaleString(),
      icon: CreditCard,
      change: "+23%",
    },
    {
      title: "Crescimento Mensal",
      value: `${monthlyGrowth}%`,
      icon: TrendingUp,
      change: "+5%",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> desde o mês passado
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
