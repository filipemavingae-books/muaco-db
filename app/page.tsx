import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FixedFooterBar } from "@/components/fixed-footer-bar"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Code, Zap, Shield, Globe, Smartphone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
              Base de Dados em Nuvem
              <span className="text-primary block">Moderna e Simples</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Crie, gerencie e escale suas bases de dados com APIs automáticas, painéis intuitivos e integração
              universal com qualquer linguagem de programação.
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

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Funcionalidades Principais</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo que precisa para criar e gerir bases de dados modernas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="animate-slide-in-right hover:shadow-lg transition-shadow">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle>APIs Automáticas</CardTitle>
                <CardDescription>
                  Gere APIs REST completas automaticamente com UUID único e links personalizados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="animate-slide-in-right hover:shadow-lg transition-shadow"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <Code className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Multi-Linguagem</CardTitle>
                <CardDescription>Compatível com Python, C#, JavaScript, Java, Go, C++ e muito mais</CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="animate-slide-in-right hover:shadow-lg transition-shadow"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Performance</CardTitle>
                <CardDescription>
                  PostgreSQL e SQL Server otimizados para máxima velocidade e confiabilidade
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="animate-slide-in-right hover:shadow-lg transition-shadow"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Autenticação JWT, HTTPS, rate limiting e API keys para máxima segurança
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="animate-slide-in-right hover:shadow-lg transition-shadow"
              style={{ animationDelay: "0.4s" }}
            >
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Global</CardTitle>
                <CardDescription>
                  Infraestrutura distribuída para baixa latência em qualquer lugar do mundo
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="animate-slide-in-right hover:shadow-lg transition-shadow"
              style={{ animationDelay: "0.5s" }}
            >
              <CardHeader>
                <Smartphone className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Mobile First</CardTitle>
                <CardDescription>
                  Interface responsiva e app móvel para gerir suas bases de dados em movimento
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pronto para começar?</h2>
          <p className="text-lg text-muted-foreground mb-8">Crie sua primeira base de dados em menos de 2 minutos</p>
          <Button size="lg" asChild>
            <Link href="/register">Começar Agora - Grátis</Link>
          </Button>
        </div>
      </section>

      <Footer />
      <FixedFooterBar />
    </div>
  )
}
