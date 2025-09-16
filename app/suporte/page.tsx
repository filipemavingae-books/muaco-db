"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Clock,
  Search,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Video,
  Users,
} from "lucide-react"
import Link from "next/link"

interface FAQ {
  question: string
  answer: string
  category: string
}

export default function SuportePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    message: "",
  })

  const faqs: FAQ[] = [
    {
      question: "Como criar minha primeira base de dados?",
      answer:
        "Após fazer login, clique em 'Nova Base de Dados' no dashboard, escolha um nome e clique em 'Criar'. Você receberá automaticamente um UUID único e uma API key para começar a usar.",
      category: "Primeiros Passos",
    },
    {
      question: "Qual é o limite de requests por minuto?",
      answer:
        "Os limites variam por plano: Grátis (100/min), Básico (1000/min), Pro (10000/min), Enterprise (ilimitado). Você pode ver seu uso atual no dashboard.",
      category: "Limites",
    },
    {
      question: "Como funciona a sincronização offline?",
      answer:
        "O MuacoDB usa Service Workers para cache local. Quando offline, os dados são armazenados localmente e sincronizados automaticamente quando a conexão retorna.",
      category: "Funcionalidades",
    },
    {
      question: "Posso usar qualquer linguagem de programação?",
      answer:
        "Sim! Nossa API REST funciona com qualquer linguagem que suporte HTTP: JavaScript, Python, C#, Java, PHP, Go, Ruby, etc.",
      category: "Desenvolvimento",
    },
    {
      question: "Como alterar meu plano?",
      answer:
        "Vá para Configurações > Plano no dashboard e escolha o novo plano. A alteração é imediata para upgrades e no próximo ciclo para downgrades.",
      category: "Conta",
    },
    {
      question: "Os dados são seguros?",
      answer:
        "Sim, todos os dados são criptografados em trânsito (HTTPS) e em repouso (AES-256). Fazemos backups automáticos diários e temos certificação SOC 2.",
      category: "Segurança",
    },
  ]

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria enviado o ticket para o sistema de suporte
    alert("Ticket enviado com sucesso! Responderemos em breve.")
    setTicketForm({
      name: "",
      email: "",
      subject: "",
      priority: "medium",
      message: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Centro de Suporte
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">Como podemos ajudar?</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Encontre respostas rápidas, envie tickets de suporte ou entre em contacto connosco
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Documentação</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Guias completos e referências de API</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/docs">Ver Docs</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Comunidade</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Fórum da comunidade</p>
                <Button variant="outline" size="sm">
                  Participar
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Chat ao Vivo</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Suporte imediato</p>
                <Button variant="outline" size="sm">
                  Iniciar Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="faq" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
              <TabsTrigger value="ticket">Abrir Ticket</TabsTrigger>
              <TabsTrigger value="contact">Contacto</TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>Perguntas Frequentes</span>
                  </CardTitle>
                  <CardDescription>Encontre respostas rápidas para as dúvidas mais comuns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Pesquisar nas perguntas frequentes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="space-y-4">
                    {filteredFAQs.map((faq, index) => (
                      <div key={index} className="border rounded-lg">
                        <button
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                          onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        >
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="text-xs">
                              {faq.category}
                            </Badge>
                            <span className="font-medium">{faq.question}</span>
                          </div>
                          {expandedFAQ === index ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                        {expandedFAQ === index && (
                          <div className="px-4 pb-3 text-sm text-muted-foreground border-t bg-muted/20">
                            <p className="pt-3">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {filteredFAQs.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Nenhuma pergunta encontrada para "{searchQuery}"</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ticket Tab */}
            <TabsContent value="ticket" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>Abrir Ticket de Suporte</span>
                  </CardTitle>
                  <CardDescription>
                    Descreva seu problema detalhadamente e nossa equipe responderá em breve
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTicketSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nome</label>
                        <Input
                          required
                          value={ticketForm.name}
                          onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          type="email"
                          required
                          value={ticketForm.email}
                          onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Assunto</label>
                      <Input
                        required
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                        placeholder="Descreva brevemente o problema"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Prioridade</label>
                      <select
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="low">Baixa - Pergunta geral</option>
                        <option value="medium">Média - Problema não crítico</option>
                        <option value="high">Alta - Problema que afeta o trabalho</option>
                        <option value="urgent">Urgente - Sistema indisponível</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição</label>
                      <Textarea
                        required
                        rows={6}
                        value={ticketForm.message}
                        onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                        placeholder="Descreva o problema em detalhe. Inclua passos para reproduzir, mensagens de erro, etc."
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Enviar Ticket
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>Contacto por Email</span>
                    </CardTitle>
                    <CardDescription>Para questões gerais e suporte técnico</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">Suporte Técnico</p>
                      <p className="text-sm text-muted-foreground">suporte@muacodb.com</p>
                      <p className="text-xs text-muted-foreground">Resposta em até 24 horas</p>
                    </div>
                    <div>
                      <p className="font-medium">Vendas</p>
                      <p className="text-sm text-muted-foreground">vendas@muacodb.com</p>
                      <p className="text-xs text-muted-foreground">Resposta em até 4 horas</p>
                    </div>
                    <div>
                      <p className="font-medium">Parcerias</p>
                      <p className="text-sm text-muted-foreground">parcerias@muacodb.com</p>
                      <p className="text-xs text-muted-foreground">Resposta em até 48 horas</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Horários de Atendimento</span>
                    </CardTitle>
                    <CardDescription>Quando nossa equipe está disponível</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">Chat ao Vivo</p>
                      <p className="text-sm text-muted-foreground">Segunda a Sexta: 9h às 18h (GMT)</p>
                      <p className="text-xs text-muted-foreground">Planos Pro e Enterprise: 24/7</p>
                    </div>
                    <div>
                      <p className="font-medium">Suporte por Email</p>
                      <p className="text-sm text-muted-foreground">24 horas por dia, 7 dias por semana</p>
                      <p className="text-xs text-muted-foreground">Resposta garantida em até 24h</p>
                    </div>
                    <div>
                      <p className="font-medium">Suporte Telefónico</p>
                      <p className="text-sm text-muted-foreground">Apenas para planos Enterprise</p>
                      <p className="text-xs text-muted-foreground">+244 900 000 000</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* SLA Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Acordo de Nível de Serviço (SLA)</CardTitle>
                  <CardDescription>Nossos compromissos de tempo de resposta por plano</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded">
                      <p className="font-medium">Grátis</p>
                      <p className="text-2xl font-bold text-muted-foreground">48h</p>
                      <p className="text-xs text-muted-foreground">Tempo de resposta</p>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <p className="font-medium">Básico</p>
                      <p className="text-2xl font-bold text-blue-600">24h</p>
                      <p className="text-xs text-muted-foreground">Tempo de resposta</p>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <p className="font-medium">Pro</p>
                      <p className="text-2xl font-bold text-green-600">4h</p>
                      <p className="text-xs text-muted-foreground">Tempo de resposta</p>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <p className="font-medium">Enterprise</p>
                      <p className="text-2xl font-bold text-purple-600">1h</p>
                      <p className="text-xs text-muted-foreground">Tempo de resposta</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
