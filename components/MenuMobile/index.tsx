'use client'
import { useState, useEffect } from 'react'
import { Home, Trophy, Zap, Users, Settings, LogOut, X, Menu } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Flash, Rank, Ranking, Weight } from 'iconsax-reactjs'

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


    <div className="w-full flex justify-around items-center fixed bottom-0 z-50 p-2 bg-black ">

      <a href="/ranking">
        <div className="flex flex-col items-center">
          <Rank variant="Bold" size="20" color="white" />
          <p className='text-xs text-white'>Ranking</p>
        </div>
      </a>

      <a href="">
        <div className="flex flex-col items-center">
          <Weight variant="Bold" size="20" color="white" />
          <p className='text-xs text-white'>Desafios</p>
        </div>
      </a>

      <a href="">
        <div className="flex flex-col items-center">
          <Flash variant="Bold" size="20" color="white" />
          <p className='text-xs text-white'>Missão Relâmpago</p>
        </div>
      </a>
    </div>
  )
}