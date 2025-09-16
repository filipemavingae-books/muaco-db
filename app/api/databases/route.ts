import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, extractTokenFromHeader } from "@/lib/auth"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      return NextResponse.json({ error: "Token de acesso requerido" }, { status: 401 })
    }

    // Verificar token
    const decoded = verifyToken(token)
    const user = await db.users.findById(decoded.userId)

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    const { name } = await request.json()

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: "Nome da base de dados é obrigatório" }, { status: 400 })
    }

    // Verificar limites do plano
    const userDatabases = await db.databases.findByUserId(user.id)
    const planLimits = {
      free: 1,
      basic: 5,
      pro: 20,
      enterprise: -1, // ilimitado
    }

    const limit = planLimits[user.plan]
    if (limit !== -1 && userDatabases.length >= limit) {
      return NextResponse.json(
        { error: `Limite de ${limit} base(s) de dados atingido para o plano ${user.plan}` },
        { status: 403 },
      )
    }

    // Criar nova base de dados
    const database = await db.databases.create({
      name: name.trim(),
      userId: user.id,
    })

    return NextResponse.json({
      success: true,
      database: {
        id: database.id,
        name: database.name,
        uuid: database.uuid,
        apiKey: database.apiKey,
        apiLink: database.apiLink,
        createdAt: database.createdAt,
      },
    })
  } catch (error) {
    console.error("Database creation error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      return NextResponse.json({ error: "Token de acesso requerido" }, { status: 401 })
    }

    // Verificar token
    const decoded = verifyToken(token)
    const user = await db.users.findById(decoded.userId)

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    // Buscar bases de dados do usuário
    const databases = await db.databases.findByUserId(user.id)

    return NextResponse.json({
      success: true,
      databases: databases.map((db) => ({
        id: db.id,
        name: db.name,
        uuid: db.uuid,
        apiKey: db.apiKey,
        apiLink: db.apiLink,
        createdAt: db.createdAt,
        recordCount: db.data.length,
      })),
    })
  } catch (error) {
    console.error("Database fetch error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
