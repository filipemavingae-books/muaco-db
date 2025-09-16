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
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Building } from "lucide-react"

export default function ContactoPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    type: "general",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria enviado o formulário
    alert("Mensagem enviada com sucesso! Entraremos em contacto em breve.")
    setContactForm({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      type: "general",
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
              Contacto
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">Entre em Contacto</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tem alguma pergunta, sugestão ou quer saber mais sobre o MuacoDB? Estamos aqui para ajudar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Send className="h-5 w-5 text-primary" />
                    <span>Enviar Mensagem</span>
                  </CardTitle>
                  <CardDescription>Preencha o formulário e responderemos o mais breve possível</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nome *</label>
                        <Input
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Empresa</label>
                      <Input
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        placeholder="Nome da sua empresa (opcional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Tipo de Contacto</label>
                      <select
                        value={contactForm.type}
                        onChange={(e) => setContactForm({ ...contactForm, type: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="general">Pergunta Geral</option>
                        <option value="sales">Vendas</option>
                        <option value="support">Suporte Técnico</option>
                        <option value="partnership">Parcerias</option>
                        <option value="media">Imprensa</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Assunto *</label>
                      <Input
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="Resumo da sua mensagem"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Mensagem *</label>
                      <Textarea
                        required
                        rows={6}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Descreva sua pergunta ou como podemos ajudar..."
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>Informações de Contacto</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">contacto@muacodb.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-sm text-muted-foreground">+244 900 000 000</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p className="text-sm text-muted-foreground">
                        Rua da Tecnologia, 123
                        <br />
                        Luanda, Angola
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Horário</p>
                      <p className="text-sm text-muted-foreground">
                        Segunda a Sexta
                        <br />
                        9h às 18h (GMT)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Departments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-primary" />
                    <span>Departamentos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Vendas</p>
                    <p className="text-sm text-muted-foreground">vendas@muacodb.com</p>
                    <p className="text-xs text-muted-foreground">Para informações sobre planos e preços</p>
                  </div>
                  <div>
                    <p className="font-medium">Suporte Técnico</p>
                    <p className="text-sm text-muted-foreground">suporte@muacodb.com</p>
                    <p className="text-xs text-muted-foreground">Para problemas técnicos e dúvidas</p>
                  </div>
                  <div>
                    <p className="font-medium">Parcerias</p>
                    <p className="text-sm text-muted-foreground">parcerias@muacodb.com</p>
                    <p className="text-xs text-muted-foreground">Para oportunidades de parceria</p>
                  </div>
                  <div>
                    <p className="font-medium">Imprensa</p>
                    <p className="text-sm text-muted-foreground">imprensa@muacodb.com</p>
                    <p className="text-xs text-muted-foreground">Para consultas da imprensa</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Links Úteis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/suporte">Centro de Suporte</a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/docs">Documentação</a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/status">Status do Sistema</a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/pricing">Planos e Preços</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Perguntas Frequentes sobre Contacto</CardTitle>
                <CardDescription>Respostas rápidas para dúvidas comuns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Quanto tempo demora a resposta?</h4>
                    <p className="text-sm text-muted-foreground">
                      Respondemos a emails gerais em até 24 horas. Para questões de vendas, geralmente em 4 horas.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Posso agendar uma chamada?</h4>
                    <p className="text-sm text-muted-foreground">
                      Sim! Entre em contacto connosco e podemos agendar uma chamada para discutir suas necessidades.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Têm suporte em português?</h4>
                    <p className="text-sm text-muted-foreground">
                      Sim, toda nossa equipe fala português e oferecemos suporte completo no idioma.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Posso visitar o escritório?</h4>
                    <p className="text-sm text-muted-foreground">
                      Claro! Agende uma visita através do email contacto@muacodb.com com antecedência.
                    </p>
                  </div>
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
