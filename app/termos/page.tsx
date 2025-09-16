import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Shield, Users, AlertTriangle } from "lucide-react"

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Termos de Serviço
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">Termos de Serviço</h1>
            <p className="text-xl text-muted-foreground">Condições de uso dos serviços MuacoDB</p>
            <p className="text-sm text-muted-foreground mt-2">Última atualização: 16 de dezembro de 2024</p>
          </div>

          {/* Terms Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Uso Justo</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Use nossos serviços de forma responsável e dentro dos limites estabelecidos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Segurança</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Mantenha suas credenciais seguras e reporte atividades suspeitas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Responsabilidades</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Entenda suas responsabilidades e as nossas como fornecedor do serviço
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Aceitação dos Termos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ao aceder e usar os serviços MuacoDB, você concorda em cumprir estes Termos de Serviço. Se não
                  concordar com qualquer parte destes termos, não deve usar nossos serviços. Estes termos aplicam-se a
                  todos os usuários, incluindo visitantes, usuários registados e clientes pagantes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Descrição do Serviço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  O MuacoDB é uma plataforma de base de dados em nuvem que oferece:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Criação e gestão de bases de dados PostgreSQL e SQL Server</li>
                  <li>• APIs REST automáticas para acesso aos dados</li>
                  <li>• Interface web para gestão e monitorização</li>
                  <li>• Funcionalidades offline com sincronização automática</li>
                  <li>• Backup automático e recuperação de dados</li>
                  <li>• Suporte técnico conforme o plano escolhido</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Contas de Usuário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Registo</h4>
                  <p className="text-sm text-muted-foreground">
                    Para usar nossos serviços, deve criar uma conta fornecendo informações precisas e atualizadas. É
                    responsável por manter a confidencialidade das suas credenciais.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Responsabilidade da Conta</h4>
                  <p className="text-sm text-muted-foreground">
                    Você é responsável por todas as atividades que ocorrem na sua conta. Deve notificar-nos
                    imediatamente sobre qualquer uso não autorizado.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Elegibilidade</h4>
                  <p className="text-sm text-muted-foreground">
                    Deve ter pelo menos 18 anos ou a idade legal no seu país para usar nossos serviços.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Uso Aceitável</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Usos Permitidos</h4>
                  <p className="text-sm text-muted-foreground">
                    Pode usar nossos serviços para armazenar e gerir dados legítimos para suas aplicações, websites e
                    projetos pessoais ou comerciais.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Usos Proibidos</h4>
                  <p className="text-sm text-muted-foreground mb-2">Não pode usar nossos serviços para:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Armazenar conteúdo ilegal, difamatório ou que viole direitos de terceiros</li>
                    <li>• Distribuir malware, vírus ou código malicioso</li>
                    <li>• Realizar ataques de negação de serviço ou sobrecarregar nossos sistemas</li>
                    <li>• Tentar aceder a contas ou dados de outros usuários</li>
                    <li>• Revender ou redistribuir nossos serviços sem autorização</li>
                    <li>• Usar para spam, phishing ou outras atividades fraudulentas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Planos e Pagamentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Planos de Serviço</h4>
                  <p className="text-sm text-muted-foreground">
                    Oferecemos diferentes planos com limites e funcionalidades variados. Os detalhes estão disponíveis
                    na nossa página de preços.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Faturação</h4>
                  <p className="text-sm text-muted-foreground">
                    Os planos pagos são faturados mensalmente ou anualmente, conforme escolhido. Os pagamentos são
                    processados no início de cada período de faturação.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Reembolsos</h4>
                  <p className="text-sm text-muted-foreground">
                    Oferecemos reembolso proporcional para cancelamentos dentro dos primeiros 30 dias. Após este
                    período, não há reembolsos, mas pode cancelar a qualquer momento.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Alterações de Preços</h4>
                  <p className="text-sm text-muted-foreground">
                    Podemos alterar os preços com aviso prévio de 30 dias. As alterações aplicam-se ao próximo período
                    de faturação.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Propriedade dos Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Seus Dados</h4>
                  <p className="text-sm text-muted-foreground">
                    Você mantém todos os direitos sobre os dados que armazena nos nossos serviços. Não reivindicamos
                    propriedade sobre seus dados.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Licença de Uso</h4>
                  <p className="text-sm text-muted-foreground">
                    Concede-nos uma licença limitada para processar, armazenar e transmitir seus dados apenas para
                    fornecer nossos serviços.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Backup e Recuperação</h4>
                  <p className="text-sm text-muted-foreground">
                    Realizamos backups regulares, mas recomenda que mantenha suas próprias cópias de segurança dos dados
                    críticos.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Disponibilidade do Serviço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Uptime</h4>
                  <p className="text-sm text-muted-foreground">
                    Esforçamo-nos para manter 99.9% de disponibilidade, mas não garantimos operação ininterrupta.
                    Manutenções programadas serão comunicadas com antecedência.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Limitações</h4>
                  <p className="text-sm text-muted-foreground">
                    Cada plano tem limites específicos de armazenamento, requests por minuto e número de bases de dados.
                    O excesso pode resultar em throttling ou suspensão temporária.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Suspensão e Terminação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Suspensão</h4>
                  <p className="text-sm text-muted-foreground">
                    Podemos suspender sua conta por violação destes termos, falta de pagamento ou atividade suspeita.
                    Tentaremos notificá-lo antes da suspensão, quando possível.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Terminação</h4>
                  <p className="text-sm text-muted-foreground">
                    Qualquer parte pode terminar estes termos a qualquer momento. Após a terminação, seus dados serão
                    mantidos por 30 dias para permitir recuperação.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Efeitos da Terminação</h4>
                  <p className="text-sm text-muted-foreground">
                    Após a terminação, perderá acesso aos serviços e seus dados serão eliminados conforme nossa política
                    de retenção.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Limitação de Responsabilidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-2">Aviso Importante</h4>
                      <p className="text-sm text-yellow-700">
                        Nossos serviços são fornecidos "como estão". Não garantimos que sejam livres de erros ou
                        adequados para todos os propósitos.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nossa responsabilidade total por danos não excederá o valor pago pelos serviços nos últimos 12 meses.
                  Não somos responsáveis por danos indiretos, lucros cessantes ou perda de dados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Alterações aos Termos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Podemos modificar estes termos ocasionalmente. Alterações significativas serão comunicadas por email
                  ou através de aviso no serviço com 30 dias de antecedência. O uso continuado após as alterações
                  constitui aceitação dos novos termos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Lei Aplicável</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Estes termos são regidos pelas leis de Angola. Qualquer disputa será resolvida nos tribunais
                  competentes de Luanda, Angola.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Para questões sobre estes termos, entre em contacto connosco:
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> legal@muacodb.com
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
