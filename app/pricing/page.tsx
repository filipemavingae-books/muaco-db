"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { PricingCards } from "@/components/pricing/pricing-cards"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PricingPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    // Redirect to dashboard or payment processing
    if (planId === "free") {
      router.push("/dashboard")
    } else {
      // For paid plans, you would integrate with payment processor here
      router.push("/dashboard?upgraded=true")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button variant="ghost" onClick={() => router.back()} className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Escolha o Plano Ideal</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comece grátis e escale conforme sua necessidade. Todos os planos incluem APIs seguras e suporte técnico.
              </p>
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <PricingCards onSelectPlan={handleSelectPlan} />

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-left">
                <h3 className="font-semibold mb-2">Posso mudar de plano a qualquer momento?</h3>
                <p className="text-muted-foreground text-sm">
                  Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-2">Os dados são seguros?</h3>
                <p className="text-muted-foreground text-sm">
                  Todos os dados são criptografados e armazenados com segurança máxima.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-2">Há suporte técnico?</h3>
                <p className="text-muted-foreground text-sm">
                  Sim, oferecemos suporte por email para todos os planos e 24/7 para planos Pro+.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-2">Posso cancelar a qualquer momento?</h3>
                <p className="text-muted-foreground text-sm">
                  Sim, não há contratos de longo prazo. Cancele quando quiser.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
