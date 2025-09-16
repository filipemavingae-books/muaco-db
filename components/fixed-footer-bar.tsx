"use client"

import { Button } from "@/components/ui/button"
import { Plus, Database, Code, Settings } from "lucide-react"
import Link from "next/link"

export function FixedFooterBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        <Link href="/dashboard" className="flex flex-col items-center space-y-1 p-2">
          <Database className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Dashboard</span>
        </Link>

        <Link href="/apis" className="flex flex-col items-center space-y-1 p-2">
          <Code className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">APIs</span>
        </Link>

        <Button size="sm" className="rounded-full h-12 w-12" asChild>
          <Link href="/create">
            <Plus className="h-6 w-6" />
          </Link>
        </Button>

        <Link href="/settings" className="flex flex-col items-center space-y-1 p-2">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Config</span>
        </Link>
      </div>
    </div>
  )
}
