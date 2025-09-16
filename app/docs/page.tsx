import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Database, Key, LinkIcon, Zap } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Documentação
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">Documentação MuacoDB</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Guias completos, referências de API e exemplos para começar rapidamente com o MuacoDB
            </p>
          </div>

          {/* Quick Start */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Início Rápido</span>
                </CardTitle>
                <CardDescription>Crie sua primeira base de dados em 3 passos simples</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Criar Conta</h3>
                      <p className="text-sm text-muted-foreground">Registe-se gratuitamente e acesse o dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Criar Base de Dados</h3>
                      <p className="text-sm text-muted-foreground">Clique em "Nova Base de Dados" e escolha um nome</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Usar API</h3>
                      <p className="text-sm text-muted-foreground">Copie o link da API e comece a fazer requests</p>
                    </div>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/register">Começar Agora</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span>Exemplo Rápido</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`// JavaScript
fetch("https://api.muacodb.com/db/YOUR_UUID/data", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    nome: "João",
    idade: 30
  })
})`}
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Guias</CardTitle>
                <CardDescription>Tutoriais passo-a-passo para todas as funcionalidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/docs/getting-started" className="block text-sm hover:text-primary">
                    • Primeiros Passos
                  </Link>
                  <Link href="/docs/authentication" className="block text-sm hover:text-primary">
                    • Autenticação
                  </Link>
                  <Link href="/docs/database-management" className="block text-sm hover:text-primary">
                    • Gestão de Bases de Dados
                  </Link>
                  <Link href="/docs/offline-sync" className="block text-sm hover:text-primary">
                    • Sincronização Offline
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Database className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Referência API</CardTitle>
                <CardDescription>Documentação completa de todos os endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/docs/api/databases" className="block text-sm hover:text-primary">
                    • Gestão de Bases de Dados
                  </Link>
                  <Link href="/docs/api/crud" className="block text-sm hover:text-primary">
                    • Operações CRUD
                  </Link>
                  <Link href="/docs/api/authentication" className="block text-sm hover:text-primary">
                    • Autenticação
                  </Link>
                  <Link href="/docs/api/webhooks" className="block text-sm hover:text-primary">
                    • Webhooks
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Exemplos</CardTitle>
                <CardDescription>Código de exemplo em várias linguagens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/docs/examples/javascript" className="block text-sm hover:text-primary">
                    • JavaScript/Node.js
                  </Link>
                  <Link href="/docs/examples/python" className="block text-sm hover:text-primary">
                    • Python
                  </Link>
                  <Link href="/docs/examples/csharp" className="block text-sm hover:text-primary">
                    • C#
                  </Link>
                  <Link href="/docs/examples/php" className="block text-sm hover:text-primary">
                    • PHP
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Key className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Segurança</CardTitle>
                <CardDescription>Boas práticas e configurações de segurança</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/docs/security/api-keys" className="block text-sm hover:text-primary">
                    • Gestão de API Keys
                  </Link>
                  <Link href="/docs/security/rate-limiting" className="block text-sm hover:text-primary">
                    • Rate Limiting
                  </Link>
                  <Link href="/docs/security/encryption" className="block text-sm hover:text-primary">
                    • Criptografia
                  </Link>
                  <Link href="/docs/security/best-practices" className="block text-sm hover:text-primary">
                    • Melhores Práticas
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <LinkIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Integrações</CardTitle>
                <CardDescription>Como integrar com frameworks e ferramentas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/docs/integrations/react" className="block text-sm hover:text-primary">
                    • React/Next.js
                  </Link>
                  <Link href="/docs/integrations/vue" className="block text-sm hover:text-primary">
                    • Vue.js
                  </Link>
                  <Link href="/docs/integrations/mobile" className="block text-sm hover:text-primary">
                    • Apps Mobile
                  </Link>
                  <Link href="/docs/integrations/webhooks" className="block text-sm hover:text-primary">
                    • Webhooks
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Recursos Avançados</CardTitle>
                <CardDescription>Funcionalidades avançadas e otimizações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/docs/advanced/websockets" className="block text-sm hover:text-primary">
                    • WebSockets
                  </Link>
                  <Link href="/docs/advanced/caching" className="block text-sm hover:text-primary">
                    • Cache e Performance
                  </Link>
                  <Link href="/docs/advanced/backup" className="block text-sm hover:text-primary">
                    • Backup e Restore
                  </Link>
                  <Link href="/docs/advanced/monitoring" className="block text-sm hover:text-primary">
                    • Monitoramento
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
