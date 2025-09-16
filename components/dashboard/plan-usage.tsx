"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Zap } from "lucide-react"

interface PlanUsageProps {
  plan: "free" | "basic" | "pro" | "enterprise"
  databases: { used: number; limit: number }
  storage: { used: number; limit: number }
  apiCalls: { used: number; limit: number }
}

export function PlanUsage({ plan, databases, storage, apiCalls }: PlanUsageProps) {
  const planNames = {
    free: "Grátis",
    basic: "Básico",
    pro: "Pro",
    enterprise: "Enterprise",
  }

  const planColors = {
    free: "secondary",
    basic: "default",
    pro: "default",
    enterprise: "default",
  } as const

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              {plan === "enterprise" ? (
                <Crown className="h-5 w-5 text-yellow-500" />
              ) : (
                <Zap className="h-5 w-5 text-primary" />
              )}
              <span>Plano {planNames[plan]}</span>
            </CardTitle>
            <CardDescription>Uso atual dos recursos</CardDescription>
          </div>
          <Badge variant={planColors[plan]}>{planNames[plan]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Databases Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Bases de Dados</span>
            <span>
              {databases.used} / {databases.limit === -1 ? "∞" : databases.limit}
            </span>
          </div>
          <Progress value={databases.limit === -1 ? 0 : (databases.used / databases.limit) * 100} className="h-2" />
        </div>

        {/* Storage Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Armazenamento</span>
            <span>
              {formatBytes(storage.used)} / {storage.limit === -1 ? "∞" : formatBytes(storage.limit)}
            </span>
          </div>
          <Progress value={storage.limit === -1 ? 0 : (storage.used / storage.limit) * 100} className="h-2" />
        </div>

        {/* API Calls Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Chamadas API (mês)</span>
            <span>
              {formatNumber(apiCalls.used)} / {apiCalls.limit === -1 ? "∞" : formatNumber(apiCalls.limit)}
            </span>
          </div>
          <Progress value={apiCalls.limit === -1 ? 0 : (apiCalls.used / apiCalls.limit) * 100} className="h-2" />
        </div>

        {plan === "free" && (
          <div className="pt-4 border-t">
            <Button className="w-full">Fazer Upgrade do Plano</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
