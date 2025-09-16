"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertCircle, Clock, Activity, Database, Globe, Zap } from "lucide-react"

interface ServiceStatus {
  name: string
  status: "operational" | "degraded" | "outage"
  uptime: number
  responseTime: number
  lastIncident?: string
}

interface Incident {
  id: string
  title: string
  status: "investigating" | "identified" | "monitoring" | "resolved"
  severity: "minor" | "major" | "critical"
  createdAt: string
  updatedAt: string
  description: string
}

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [overallStatus, setOverallStatus] = useState<"operational" | "degraded" | "outage">("operational")

  useEffect(() => {
    // Simular dados de status em tempo real
    const mockServices: ServiceStatus[] = [
      {
        name: "API Principal",
        status: "operational",
        uptime: 99.98,
        responseTime: 145,
      },
      {
        name: "Base de Dados PostgreSQL",
        status: "operational",
        uptime: 99.95,
        responseTime: 89,
      },
      {
        name: "Base de Dados SQL Server",
        status: "operational",
        uptime: 99.92,
        responseTime: 112,
      },
      {
        name: "WebSocket Service",
        status: "operational",
        uptime: 99.87,
        responseTime: 67,
      },
      {
        name: "CDN Global",
        status: "degraded",
        uptime: 98.45,
        responseTime: 234,
        lastIncident: "Lentidão em algumas regiões",
      },
      {
        name: "Sistema de Autenticação",
        status: "operational",
        uptime: 99.99,
        responseTime: 78,
      },
      {
        name: "Dashboard Web",
        status: "operational",
        uptime: 99.94,
        responseTime: 156,
      },
      {
        name: "Sistema de Backup",
        status: "operational",
        uptime: 99.89,
        responseTime: 345,
      },
    ]

    const mockIncidents: Incident[] = [
      {
        id: "1",
        title: "Lentidão intermitente na CDN",
        status: "monitoring",
        severity: "minor",
        createdAt: "2024-12-16T14:30:00Z",
        updatedAt: "2024-12-16T15:45:00Z",
        description: "Identificamos lentidão em algumas regiões da CDN. Estamos monitorando a situação.",
      },
      {
        id: "2",
        title: "Manutenção programada concluída",
        status: "resolved",
        severity: "minor",
        createdAt: "2024-12-15T02:00:00Z",
        updatedAt: "2024-12-15T04:30:00Z",
        description: "Manutenção programada dos servidores de base de dados concluída com sucesso.",
      },
    ]

    setServices(mockServices)
    setIncidents(mockIncidents)

    // Determinar status geral
    const hasOutage = mockServices.some((s) => s.status === "outage")
    const hasDegraded = mockServices.some((s) => s.status === "degraded")

    if (hasOutage) {
      setOverallStatus("outage")
    } else if (hasDegraded) {
      setOverallStatus("degraded")
    } else {
      setOverallStatus("operational")
    }

    // Simular atualizações em tempo real
    const interval = setInterval(() => {
      setServices((prev) =>
        prev.map((service) => ({
          ...service,
          responseTime: service.responseTime + Math.floor(Math.random() * 20) - 10,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "outage":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500"
      case "degraded":
        return "bg-yellow-500"
      case "outage":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "Operacional"
      case "degraded":
        return "Degradado"
      case "outage":
        return "Indisponível"
      default:
        return "Desconhecido"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minor":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "major":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-PT", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {getStatusIcon(overallStatus)}
              <Badge variant="secondary" className={`${getStatusColor(overallStatus)} text-white border-0`}>
                {getStatusText(overallStatus)}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Status do Sistema</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Monitoramento em tempo real de todos os serviços MuacoDB
            </p>
          </div>

          {/* Overall Status */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Status Geral</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(overallStatus)}
                  <div>
                    <p className="font-medium">
                      {overallStatus === "operational" && "Todos os sistemas operacionais"}
                      {overallStatus === "degraded" && "Alguns sistemas com problemas"}
                      {overallStatus === "outage" && "Problemas críticos detectados"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Última atualização: {new Date().toLocaleTimeString("pt-PT")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">99.94%</p>
                  <p className="text-sm text-muted-foreground">Uptime (30 dias)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Status */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Status dos Serviços</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      {getStatusIcon(service.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Uptime</span>
                      <span className="font-medium">{service.uptime}%</span>
                    </div>
                    <Progress value={service.uptime} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Tempo de Resposta</span>
                      <span className="font-medium">{service.responseTime}ms</span>
                    </div>
                    {service.lastIncident && (
                      <div className="text-xs text-muted-foreground bg-muted p-2 rounded">{service.lastIncident}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Incidentes Recentes</h2>
            {incidents.length > 0 ? (
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <Card key={incident.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(incident.severity)}>
                            {incident.severity === "minor" && "Menor"}
                            {incident.severity === "major" && "Maior"}
                            {incident.severity === "critical" && "Crítico"}
                          </Badge>
                          <Badge variant="outline">
                            {incident.status === "investigating" && "Investigando"}
                            {incident.status === "identified" && "Identificado"}
                            {incident.status === "monitoring" && "Monitorando"}
                            {incident.status === "resolved" && "Resolvido"}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>
                        Criado: {formatDate(incident.createdAt)} • Atualizado: {formatDate(incident.updatedAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{incident.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium">Nenhum incidente recente</p>
                  <p className="text-muted-foreground">Todos os sistemas estão funcionando normalmente</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <Database className="h-4 w-4 text-primary" />
                  <span>Bases de Dados</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,247</div>
                <p className="text-xs text-muted-foreground">Bases ativas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Requests/min</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">Média atual</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>Regiões</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Datacenters ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span>Uptime</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">99.94%</div>
                <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
              </CardContent>
            </Card>
          </div>

          {/* Subscribe to Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Receber Notificações</CardTitle>
              <CardDescription>Mantenha-se informado sobre o status dos nossos serviços</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Subscrever
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Receba notificações por email sobre incidentes e manutenções programadas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
