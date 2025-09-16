import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, MessageCircle, FileText, Code, Database, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function AjudaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Centro de Ajuda
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">Como podemos ajudar?</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Encontre guias, tutoriais e recursos para aproveitar ao máximo o MuacoDB
            </p>
          </div>

          {/* Quick Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Primeiros Passos</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Guia completo para começar</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/docs/getting-started">Começar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Code className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Referência API</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Documentação completa da API</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/api">Ver API</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Video className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Tutoriais</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Vídeos passo-a-passo</p>
                <Button variant="outline" size="sm">
                  Ver Vídeos
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Suporte</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Fale com nossa equipe</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/suporte">Contactar</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Popular Topics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Tópicos Populares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-primary" />
                    <span>Gestão de Bases de Dados</span>
                  </CardTitle>
                  <CardDescription>Como criar, configurar e gerir suas bases de dados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/docs/database/create" className="block text-sm hover:text-primary">
                    • Como criar uma nova base de dados
                  </Link>
                  <Link href="/docs/database/configure" className="block text-sm hover:text-primary">
                    • Configurar permissões e acesso
                  </Link>
                  <Link href="/docs/database/backup" className="block text-sm hover:text-primary">
                    • Backup e restauração
                  </Link>
                  <Link href="/docs/database/migration" className="block text-sm hover:text-primary">
                    • Migração de dados
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="h-5 w-5 text-primary" />
                    <span>Desenvolvimento</span>
                  </CardTitle>
                  <CardDescription>Guias para desenvolvedores e integrações</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/docs/api/authentication" className="block text-sm hover:text-primary">
                    • Autenticação e API Keys
                  </Link>
                  <Link href="/docs/api/crud" className="block text-sm hover:text-primary">
                    • Operações CRUD
                  </Link>
                  <Link href="/docs/sdk/javascript" className="block text-sm hover:text-primary">
                    • SDK JavaScript
                  </Link>
                  <Link href="/docs/webhooks" className="block text-sm hover:text-primary">
                    • Configurar Webhooks
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Segurança</span>
                  </CardTitle>
                  <CardDescription>Melhores práticas de segurança</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/docs/security/api-keys" className="block text-sm hover:text-primary">
                    • Gestão segura de API Keys
                  </Link>
                  <Link href="/docs/security/encryption" className="block text-sm hover:text-primary">
                    • Criptografia de dados
                  </Link>
                  <Link href="/docs/security/access-control" className="block text-sm hover:text-primary">
                    • Controlo de acesso
                  </Link>
                  <Link href="/docs/security/audit" className="block text-sm hover:text-primary">
                    • Logs de auditoria
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>Performance</span>
                  </CardTitle>
                  <CardDescription>Otimização e melhores práticas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/docs/performance/caching" className="block text-sm hover:text-primary">
                    • Estratégias de cache
                  </Link>
                  <Link href="/docs/performance/indexing" className="block text-sm hover:text-primary">
                    • Otimização de índices
                  </Link>
                  <Link href="/docs/performance/queries" className="block text-sm hover:text-primary">
                    • Consultas eficientes
                  </Link>
                  <Link href="/docs/performance/monitoring" className="block text-sm hover:text-primary">
                    • Monitoramento
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Resources */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recursos Adicionais</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Documentação Técnica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Documentação completa com exemplos de código e referências detalhadas
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/docs">Explorar Docs</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MessageCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Comunidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Junte-se à nossa comunidade para fazer perguntas e partilhar conhecimento
                  </p>
                  <Button variant="outline" size="sm">
                    Participar
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Video className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Canal YouTube</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tutoriais em vídeo, webinars e demonstrações práticas
                  </p>
                  <Button variant="outline" size="sm">
                    Ver Canal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Ainda precisa de ajuda?</CardTitle>
              <CardDescription>Nossa equipe de suporte está pronta para ajudar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link href="/suporte">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contactar Suporte
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contacto">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
