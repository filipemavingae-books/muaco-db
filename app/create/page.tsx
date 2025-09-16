"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { CreateDatabaseDialog } from "@/components/create-database-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Code, Key, Link, ArrowLeft } from "lucide-react"

export default function CreatePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [newDatabase, setNewDatabase] = useState<any>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
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

  if (!user) {
    return null
  }

  const handleDatabaseCreated = (database: any) => {
    setNewDatabase(database)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Criar Base de Dados</h1>
              <p className="text-muted-foreground mt-1">Gere uma nova API com UUID único em segundos</p>
            </div>
          </div>

          {!newDatabase ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Nova Base de Dados</CardTitle>
                  <CardDescription>Crie uma base de dados com API REST automática</CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateDatabaseDialog onDatabaseCreated={handleDatabaseCreated} />
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>O que você recebe</CardTitle>
                  <CardDescription>Cada base de dados inclui automaticamente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-primary" />
                    <span>UUID único para identificação</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Key className="h-5 w-5 text-primary" />
                    <span>API Key segura para autenticação</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link className="h-5 w-5 text-primary" />
                    <span>Link único da API</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Code className="h-5 w-5 text-primary" />
                    <span>CRUD completo (Create, Read, Update, Delete)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Success State */
            <Card className="animate-fade-in-up">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Base de Dados Criada!</CardTitle>
                <CardDescription>Sua nova API está pronta para usar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Nome</Label>
                    <div className="mt-1 p-2 bg-muted rounded text-sm">{newDatabase.name}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">UUID</Label>
                    <div className="mt-1 p-2 bg-muted rounded text-sm font-mono">{newDatabase.uuid}</div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">API Link</Label>
                  <div className="mt-1 p-2 bg-muted rounded text-sm font-mono break-all">{newDatabase.apiLink}</div>
                </div>

                <div>
                  <Label className="text-sm font-medium">API Key</Label>
                  <div className="mt-1 p-2 bg-muted rounded text-sm font-mono break-all">{newDatabase.apiKey}</div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Exemplo de Uso</h4>
                  <pre className="text-xs text-blue-800 overflow-x-auto">
                    {`// JavaScript
fetch("${newDatabase.apiLink}/data", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${newDatabase.apiKey}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ nome: "João", idade: 30 })
})`}
                  </pre>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={() => router.push("/dashboard")}>Ver Dashboard</Button>
                  <Button variant="outline" onClick={() => setNewDatabase(null)}>
                    Criar Outra
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
