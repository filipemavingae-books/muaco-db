"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, CreditCard, FileText, Phone, LogIn, Activity, HelpCircle, Code } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo-muacodb.png" alt="MuacoDB Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-foreground">MuacoDB</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/produto" className="text-foreground hover:text-primary transition-colors">
              Produto
            </Link>
            <Link
              href="/pricing"
              className="text-foreground hover:text-primary transition-colors flex items-center space-x-1"
            >
              <CreditCard className="h-4 w-4" />
              <span>Preços</span>
            </Link>
            <Link
              href="/docs"
              className="text-foreground hover:text-primary transition-colors flex items-center space-x-1"
            >
              <FileText className="h-4 w-4" />
              <span>Docs</span>
            </Link>
            <Link
              href="/api"
              className="text-foreground hover:text-primary transition-colors flex items-center space-x-1"
            >
              <Code className="h-4 w-4" />
              <span>API</span>
            </Link>
            <Link
              href="/status"
              className="text-foreground hover:text-primary transition-colors flex items-center space-x-1"
            >
              <Activity className="h-4 w-4" />
              <span>Status</span>
            </Link>
            <Link
              href="/suporte"
              className="text-foreground hover:text-primary transition-colors flex items-center space-x-1"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Suporte</span>
            </Link>
            <Link
              href="/contacto"
              className="text-foreground hover:text-primary transition-colors flex items-center space-x-1"
            >
              <Phone className="h-4 w-4" />
              <span>Contacto</span>
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Entrar
              </Link>
            </Button>
            <Button asChild>
              <Link href="/register">Registar</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/produto"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Produto
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Preços
              </Link>
              <Link
                href="/docs"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Documentação
              </Link>
              <Link
                href="/api"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                API
              </Link>
              <Link
                href="/status"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Status
              </Link>
              <Link
                href="/suporte"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Suporte
              </Link>
              <Link
                href="/contacto"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
              <div className="px-3 py-2 space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Entrar
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register">Registar</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
