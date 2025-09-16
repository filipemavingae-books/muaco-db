export interface Plan {
  id: string
  name: string
  price: number
  currency: string
  databases: number
  storage: number // in bytes
  apiCalls: number
  features: string[]
  popular?: boolean
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Grátis",
    price: 0,
    currency: "AOA",
    databases: 1,
    storage: 100 * 1024 * 1024, // 100MB
    apiCalls: 1000,
    features: ["1 Base de Dados", "100MB de Armazenamento", "1.000 Chamadas API/mês", "Suporte por Email"],
  },
  {
    id: "basic",
    name: "Básico",
    price: 500,
    currency: "AOA",
    databases: 5,
    storage: 2 * 1024 * 1024 * 1024, // 2GB
    apiCalls: 50000,
    features: [
      "5 Bases de Dados",
      "2GB de Armazenamento",
      "50.000 Chamadas API/mês",
      "Suporte Prioritário",
      "Backup Automático",
    ],
  },
  {
    id: "pro",
    name: "Profissional",
    price: 5000,
    currency: "AOA",
    databases: 20,
    storage: 20 * 1024 * 1024 * 1024, // 20GB
    apiCalls: 1000000,
    popular: true,
    features: [
      "20 Bases de Dados",
      "20GB de Armazenamento",
      "1.000.000 Chamadas API/mês",
      "Suporte 24/7",
      "Backup Automático",
      "Analytics Avançados",
      "API Rate Limit Personalizado",
    ],
  },
  {
    id: "enterprise",
    name: "Empresarial",
    price: 10000,
    currency: "AOA",
    databases: -1, // unlimited
    storage: -1, // unlimited
    apiCalls: -1, // unlimited
    features: [
      "Bases de Dados Ilimitadas",
      "Armazenamento Ilimitado",
      "Chamadas API Ilimitadas",
      "Suporte Dedicado",
      "SLA 99.9%",
      "Backup Personalizado",
      "Integração Personalizada",
      "Relatórios Personalizados",
    ],
  },
]

export function getPlanById(planId: string): Plan | undefined {
  return PLANS.find((plan) => plan.id === planId)
}

export function formatStorage(bytes: number): string {
  if (bytes === -1) return "Ilimitado"
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${Math.round(bytes / (1024 * 1024))} MB`
  return `${Math.round(bytes / (1024 * 1024 * 1024))} GB`
}

export function formatApiCalls(calls: number): string {
  if (calls === -1) return "Ilimitadas"
  if (calls < 1000) return calls.toString()
  if (calls < 1000000) return `${Math.round(calls / 1000)}K`
  return `${Math.round(calls / 1000000)}M`
}
