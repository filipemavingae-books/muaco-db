import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getPlanById } from "@/lib/plans"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { planId, paymentMethod } = await request.json()

    if (!planId || !paymentMethod) {
      return NextResponse.json({ error: "Plan ID e método de pagamento são obrigatórios" }, { status: 400 })
    }

    const plan = getPlanById(planId)
    if (!plan) {
      return NextResponse.json({ error: "Plano não encontrado" }, { status: 404 })
    }

    // For free plan, just update user directly
    if (plan.id === "free") {
      const { error: updateError } = await supabase.from("users").update({ plan: "free" }).eq("id", user.id)

      if (updateError) {
        return NextResponse.json({ error: "Erro ao atualizar plano" }, { status: 500 })
      }

      return NextResponse.json({ success: true, plan: "free" })
    }

    // For paid plans, create payment record
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + 1) // 1 month from now

    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        user_id: user.id,
        plan: plan.id,
        amount: plan.price,
        currency: plan.currency,
        status: "completed", // In real app, this would be 'pending' until payment is confirmed
        payment_method: paymentMethod,
        transaction_id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single()

    if (paymentError) {
      return NextResponse.json({ error: "Erro ao processar pagamento" }, { status: 500 })
    }

    // Update user plan
    const { error: updateError } = await supabase.from("users").update({ plan: plan.id }).eq("id", user.id)

    if (updateError) {
      return NextResponse.json({ error: "Erro ao atualizar plano do usuário" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      payment,
      plan: plan.id,
    })
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
