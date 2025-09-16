"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WifiOff, RefreshCw, Home, Database } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <WifiOff className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">Você está offline</CardTitle>
              <CardDescription>
                Não foi possível conectar à internet. Algumas funcionalidades podem estar limitadas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Funcionalidades Offline Disponíveis</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ver dados em cache das suas bases de dados</li>
                  <li>• Criar, editar e eliminar registos (serão sincronizados quando voltar online)</li>
                  <li>• Aceder à documentação em cache</li>
                  <li>• Ver informações da conta</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button onClick={() => window.location.reload()} className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Tentar Novamente
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/">
                      <Home className="h-4 w-4 mr-2" />
                      Início
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">
                      <Database className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>
                  Suas alterações serão automaticamente sincronizadas quando a conexão com a internet for restabelecida.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
