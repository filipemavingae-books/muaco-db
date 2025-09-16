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

export async function PUT(request: NextRequest, { params }: { params: { uuid: string; id: string } }) {
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

    const updates = await request.json()

    // Atualizar dados
    const record = await db.databases.updateData(params.uuid, params.id, updates)

    if (!record) {
      return NextResponse.json({ error: "Registo não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: record,
    })
  } catch (error) {
    console.error("Data update error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { uuid: string; id: string } }) {
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

    // Eliminar dados
    const deleted = await db.databases.deleteData(params.uuid, params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Registo não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Registo eliminado com sucesso",
    })
  } catch (error) {
    console.error("Data deletion error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
