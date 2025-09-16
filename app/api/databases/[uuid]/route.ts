import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, extractTokenFromHeader } from "@/lib/auth"
import { db } from "@/lib/database"

export async function DELETE(request: NextRequest, { params }: { params: { uuid: string } }) {
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

    // Verificar se a base de dados pertence ao usuário
    const database = await db.databases.findByUuid(params.uuid)
    if (!database) {
      return NextResponse.json({ error: "Base de dados não encontrada" }, { status: 404 })
    }

    if (database.userId !== user.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Eliminar base de dados
    const deleted = await db.databases.delete(params.uuid)

    if (!deleted) {
      return NextResponse.json({ error: "Erro ao eliminar base de dados" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Base de dados eliminada com sucesso",
    })
  } catch (error) {
    console.error("Database deletion error:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
