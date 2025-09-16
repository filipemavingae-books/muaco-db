import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, Database, Users, Globe } from "lucide-react"

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Política de Privacidade
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">Política de Privacidade</h1>
            <p className="text-xl text-muted-foreground">
              Como coletamos, usamos e protegemos suas informações pessoais
            </p>
            <p className="text-sm text-muted-foreground mt-2">Última atualização: 16 de dezembro de 2024</p>
          </div>

          {/* Privacy Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Proteção de Dados</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Seus dados são criptografados e protegidos com as melhores práticas de segurança
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Transparência</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Explicamos claramente que dados coletamos e como os utilizamos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Seus Direitos</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Você tem controlo total sobre seus dados pessoais e pode alterá-los a qualquer momento
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Informações que Coletamos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Informações de Conta</h4>
                  <p className="text-sm text-muted-foreground">
                    Quando cria uma conta, coletamos seu nome, endereço de email, senha (criptografada) e informações de
                    plano escolhido.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dados de Uso</h4>
                  <p className="text-sm text-muted-foreground">
                    Coletamos informações sobre como usa nossos serviços, incluindo APIs chamadas, bases de dados
                    criadas, e padrões de uso para melhorar nossos serviços.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Informações Técnicas</h4>
                  <p className="text-sm text-muted-foreground">
                    Endereço IP, tipo de navegador, sistema operativo, e informações de dispositivo para segurança e
                    otimização.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dados das Bases de Dados</h4>
                  <p className="text-sm text-muted-foreground">
                    Os dados que armazena nas suas bases de dados são seus. Não acedemos, analisamos ou utilizamos estes
                    dados para qualquer propósito além de fornecer o serviço.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Como Utilizamos suas Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Fornecimento do Serviço</h4>
                  <p className="text-sm text-muted-foreground">
                    Utilizamos suas informações para fornecer, manter e melhorar nossos serviços de base de dados.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Comunicação</h4>
                  <p className="text-sm text-muted-foreground">
                    Enviamos emails sobre atualizações do serviço, manutenções programadas, e informações importantes da
                    conta.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Segurança</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitorizamos atividades suspeitas e protegemos contra fraudes e abusos.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Melhoria do Serviço</h4>
                  <p className="text-sm text-muted-foreground">
                    Analisamos padrões de uso (de forma agregada e anónima) para melhorar funcionalidades e performance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Partilha de Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Não Vendemos Dados</h4>
                  <p className="text-sm text-muted-foreground">
                    Nunca vendemos, alugamos ou comercializamos suas informações pessoais a terceiros.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Fornecedores de Serviços</h4>
                  <p className="text-sm text-muted-foreground">
                    Partilhamos informações limitadas com fornecedores confiáveis que nos ajudam a operar nossos
                    serviços (hospedagem, pagamentos, suporte).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Requisitos Legais</h4>
                  <p className="text-sm text-muted-foreground">
                    Podemos divulgar informações quando exigido por lei ou para proteger nossos direitos e segurança.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Segurança dos Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Criptografia</h4>
                      <p className="text-sm text-muted-foreground">
                        Todos os dados são criptografados em trânsito (TLS 1.3) e em repouso (AES-256)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Database className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Backups Seguros</h4>
                      <p className="text-sm text-muted-foreground">
                        Backups automáticos diários com criptografia e armazenamento seguro
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Acesso Limitado</h4>
                      <p className="text-sm text-muted-foreground">
                        Apenas funcionários autorizados têm acesso aos sistemas, com logs de auditoria
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Conformidade</h4>
                      <p className="text-sm text-muted-foreground">
                        Seguimos padrões internacionais de segurança e proteção de dados
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Seus Direitos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Acesso aos Dados</h4>
                  <p className="text-sm text-muted-foreground">
                    Pode solicitar uma cópia de todos os dados pessoais que temos sobre você.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Correção</h4>
                  <p className="text-sm text-muted-foreground">
                    Pode corrigir informações incorretas ou desatualizadas na sua conta.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Eliminação</h4>
                  <p className="text-sm text-muted-foreground">
                    Pode solicitar a eliminação da sua conta e dados pessoais a qualquer momento.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Portabilidade</h4>
                  <p className="text-sm text-muted-foreground">
                    Pode exportar seus dados em formato estruturado para usar noutros serviços.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cookies e Tecnologias Similares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Utilizamos cookies essenciais para o funcionamento do serviço e cookies de análise para melhorar a
                  experiência do usuário. Pode gerir suas preferências de cookies nas configurações do navegador.
                </p>
                <div>
                  <h4 className="font-medium mb-2">Tipos de Cookies</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Cookies essenciais: Necessários para o funcionamento do site</li>
                    <li>• Cookies de sessão: Para manter você logado</li>
                    <li>• Cookies de análise: Para entender como usa nossos serviços</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Retenção de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Mantemos suas informações pessoais apenas pelo tempo necessário para fornecer nossos serviços ou
                  conforme exigido por lei.
                </p>
                <div>
                  <h4 className="font-medium mb-2">Períodos de Retenção</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Dados da conta: Enquanto a conta estiver ativa</li>
                    <li>• Logs de acesso: 90 dias</li>
                    <li>• Dados de faturação: 7 anos (requisito legal)</li>
                    <li>• Dados das bases de dados: Conforme sua configuração</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Alterações a esta Política</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Podemos atualizar esta política ocasionalmente. Notificaremos sobre alterações significativas por
                  email ou através de aviso no nosso serviço. O uso continuado dos nossos serviços após as alterações
                  constitui aceitação da nova política.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Se tiver dúvidas sobre esta política de privacidade ou sobre como tratamos seus dados, entre em
                  contacto connosco:
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> privacidade@muacodb.com
                  </p>
                  <p>
                    <strong>Endereço:</strong> Rua da Tecnologia, 123, Luanda, Angola
                  </p>
                  <p>
                    <strong>Telefone:</strong> +244 900 000 000
                  </p>
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
