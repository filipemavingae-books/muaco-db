"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Copy, ExternalLink, MoreVertical, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DatabaseItem {
  id: string
  name: string
  uuid: string
  apiKey: string
  apiLink: string
  createdAt: string
  recordCount: number
}

interface DatabaseListProps {
  databases: DatabaseItem[]
  onDelete: (uuid: string) => void
}

export function DatabaseList({ databases, onDelete }: DatabaseListProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedItem(type)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  if (databases.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Database className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhuma base de dados</h3>
          <p className="text-muted-foreground text-center mb-4">
            Crie sua primeira base de dados para começar a usar a API
          </p>
          <Button>Criar Base de Dados</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {databases.map((db) => (
        <Card key={db.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-primary" />
                  <span>{db.name}</span>
                </CardTitle>
                <CardDescription>Criada em {new Date(db.createdAt).toLocaleDateString("pt-PT")}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDelete(db.uuid)} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{db.recordCount} registos</Badge>
              <Badge variant="outline">UUID: {db.uuid.slice(0, 8)}...</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm font-mono truncate mr-2">{db.apiLink}</span>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(db.apiLink, `link-${db.id}`)}>
                  {copiedItem === `link-${db.id}` ? "Copiado!" : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm font-mono truncate mr-2">{db.apiKey}</span>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(db.apiKey, `key-${db.id}`)}>
                  {copiedItem === `key-${db.id}` ? "Copiado!" : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline" asChild>
                <a href={db.apiLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Testar API
                </a>
              </Button>
              <Button size="sm" variant="outline">
                Ver Dados
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
