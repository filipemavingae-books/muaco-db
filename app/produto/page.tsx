import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Code, Zap, Shield, Globe, Smartphone, Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ProdutoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Plataforma de Base de Dados
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
              MuacoDB
              <span className="text-primary block">Produto Completo</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Uma solução completa de base de dados em nuvem com APIs automáticas, painéis intuitivos e suporte offline
              para desenvolvimento moderno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Começar Grátis</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">Ver Documentação</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Funcionalidades Principais</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo que precisa para criar, gerir e escalar suas aplicações
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle>APIs Automáticas</CardTitle>
                <CardDescription>
                  Gere APIs REST completas automaticamente com UUID único, endpoints CRUD e documentação automática
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Multi-Linguagem</CardTitle>
                <CardDescription>
                  Compatível com Python, C#, JavaScript, Java, Go, C++, PHP e qualquer linguagem que suporte HTTP
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Performance Otimizada</CardTitle>
                <CardDescription>
                  PostgreSQL e SQL Server otimizados com cache inteligente e CDN global para máxima velocidade
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Segurança Avançada</CardTitle>
                <CardDescription>
                  Autenticação JWT, HTTPS obrigatório, rate limiting, API keys e criptografia de dados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Infraestrutura Global</CardTitle>
                <CardDescription>
                  Servidores distribuídos globalmente com WebSocket para sincronização em tempo real
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Suporte Offline</CardTitle>
                <CardDescription>
                  Funcionalidade offline completa com sincronização automática quando a conexão retorna
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Especificações Técnicas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnologias modernas para máxima confiabilidade e performance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Backend & Infraestrutura</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Node.js com Express/NestJS</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>PostgreSQL e SQL Server</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>WebSocket para tempo real</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Docker & Kubernetes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>MinIO para armazenamento</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Frontend & Mobile</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Next.js 14 com App Router</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Tailwind CSS + Framer Motion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>PWA com suporte offline</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Interface responsiva</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Service Workers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pronto para experimentar?</h2>
          <p className="text-lg text-muted-foreground mb-8">Crie sua primeira base de dados em menos de 2 minutos</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Começar Grátis
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">Ver Planos</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
