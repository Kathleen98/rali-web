'use client'
import { useState, useEffect } from 'react'
import { Home, Trophy, Zap, Users, Settings, LogOut, X, Menu } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { title: "Início", url: "/", icon: Home },
    { title: "Desafios", url: "/challenges", icon: Trophy },
    { title: "Missões Relâmpago", url: "/flash-missions", icon: Zap },
    { title: "Meu Grupo", url: "/group", icon: Users },
    { title: "Configurações", url: "/settings", icon: Settings },
  ]

  // Fecha o menu ao mudar de rota
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Previne scroll do body quando menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Botão de toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-6"
      >
        {isOpen ? (
          null
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu lateral */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 bg-background border-r z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header do menu */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col p-4 gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.url

            return (
              <Link
                key={item.url}
                href={item.url}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            )
          })}
    

          {/* Logout */}
          <button
            onClick={() => console.log('Logout')}
            className="flex absolute bottom-0 items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium  ">Sair</span>
          </button>
        </nav>
      </div>
    </>
  )
}