"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap } from "lucide-react"
import { PLANS, formatStorage, formatApiCalls } from "@/lib/plans"
import { useAuth } from "@/hooks/use-auth"

interface PricingCardsProps {
  onSelectPlan?: (planId: string) => void
}

export function PricingCards({ onSelectPlan }: PricingCardsProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleSelectPlan = async (planId: string) => {
    if (planId === "free") {
      onSelectPlan?.(planId)
      return
    }

    setIsLoading(planId)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onSelectPlan?.(planId)
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PLANS.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <Card className={`h-full ${plan.popular ? "border-[#8B5E3C] shadow-lg" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#8B5E3C] text-white">
                  <Zap className="h-3 w-3 mr-1" />
                  Mais Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-foreground">
                  {plan.price === 0 ? "Grátis" : `${plan.price.toLocaleString()} ${plan.currency}`}
                </span>
                {plan.price > 0 && <span className="text-sm">/mês</span>}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bases de Dados:</span>
                  <span className="font-medium">{plan.databases === -1 ? "Ilimitadas" : plan.databases}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Armazenamento:</span>
                  <span className="font-medium">{formatStorage(plan.storage)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>API Calls:</span>
                  <span className="font-medium">{formatApiCalls(plan.apiCalls)}/mês</span>
                </div>
              </div>

              <div className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className={`w-full ${plan.popular ? "bg-[#8B5E3C] hover:bg-[#8B5E3C]/90" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isLoading === plan.id || user?.plan === plan.id}
              >
                {isLoading === plan.id ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Processando...
                  </div>
                ) : user?.plan === plan.id ? (
                  "Plano Atual"
                ) : plan.price === 0 ? (
                  "Começar Grátis"
                ) : (
                  "Escolher Plano"
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
