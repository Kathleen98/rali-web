'use client'

import { ArrowSquareUp, Flash, Rank, Weight } from 'iconsax-reactjs'
import Image from 'next/image'
import logoFju from '../../public/login-image-removebg-preview.png'

export function MobileMenu() {



  return (


    <>
    <div className="fixed z-99 bg-black flex justify-center top-0 right-0 left-0  w-full">
      <Image src={logoFju} width={100} height={100} alt='logo FJU branco' />
    </div>
    
    
    <div className="w-full flex justify-around items-center fixed bottom-0 z-50 p-2 bg-black ">

      <a href="/ranking">
        <div className="flex flex-col items-center">
          <Rank variant="Bold" size="20" color="white" />
          <p className='text-xs text-white'>Ranking</p>
        </div>
      </a>

      <a href="/challenges">
        <div className="flex flex-col items-center">
          <Weight variant="Bold" size="20" color="white" />
          <p className='text-xs text-white'>Desafios</p>
        </div>
      </a>

      <a href="">
        <div className="flex flex-col items-center">
          <Flash variant="Bold" size="20" color="white" />
          <p className='text-xs text-white'>Missões</p>
        </div>
      </a>

      <a href="">
        <div className="flex flex-col items-center">
          <ArrowSquareUp variant="Bold" size="20" color="white" />
          <p className='text-xs text-white'>Enviar desafio</p>
        </div>
      </a>
    </div>
    </>
  )
}