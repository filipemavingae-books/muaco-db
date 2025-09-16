import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

// Verificar API Key
function verifyApiKey(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }
  return authHeader.substring(7)
}

export async function POST(request: NextRequest, { params }: { params: { uuid: string } }) {
  try {
    const apiKey = verifyApiKey(request)
    if (!apiKey) {
      return NextResponse.json({ error: "API Key requerida" }, { status: 401 })
    }

    // Verificar se a base de dados existe e a API key é válida
    const database = await db.databases.findByUuid(params.uuid)
    if (!database) {
      return NextResponse.json({ error: "Base de dados não encontrada" }, { status: 404 })
    }

    if (database.apiKey !== apiKey) {
      return NextResponse.json({ error: "API Key inválida" }, { status: 401 })
    }

    const data = await request.json()

    // Inserir dados
    const record = await db.databases.insertData(params.uuid, data)

    if (!record) {
      return NextResponse.json({ error: "Erro ao inserir dados" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: record,
    })
  } catch (error) {
    console.error("Data insertion error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { uuid: string } }) {
  try {
    const apiKey = verifyApiKey(request)
    if (!apiKey) {
      return NextResponse.json({ error: "API Key requerida" }, { status: 401 })
    }

    // Verificar se a base de dados existe e a API key é válida
    const database = await db.databases.findByUuid(params.uuid)
    if (!database) {
      return NextResponse.json({ error: "Base de dados não encontrada" }, { status: 404 })
    }

    if (database.apiKey !== apiKey) {
      return NextResponse.json({ error: "API Key inválida" }, { status: 401 })
    }

    // Parâmetros de paginação
    const url = new URL(request.url)
    const limit = url.searchParams.get("limit") ? Number.parseInt(url.searchParams.get("limit")!) : undefined
    const offset = url.searchParams.get("offset") ? Number.parseInt(url.searchParams.get("offset")!) : undefined

    // Buscar dados
    const data = await db.databases.getData(params.uuid, limit, offset)

    return NextResponse.json({
      success: true,
      data,
      total: database.data.length,
    })
  } catch (error) {
    console.error("Data fetch error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
