import { type NextRequest, NextResponse } from "next/server"
import { hashPassword, generateTokens } from "@/lib/auth"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validação básica
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password e nome são obrigatórios" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password deve ter pelo menos 6 caracteres" }, { status: 400 })
    }

    // Verificar se usuário já existe
    const existingUser = await db.users.findByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe com este email" }, { status: 409 })
    }

    // Criar novo usuário
    const hashedPassword = await hashPassword(password)
    const user = await db.users.create({
      email,
      name,
      password: hashedPassword,
      plan: "free",
    })

    // Gerar tokens
    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      name: user.name,
      plan: user.plan,
      createdAt: user.createdAt,
    })

    // Remover password da resposta
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      tokens,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
