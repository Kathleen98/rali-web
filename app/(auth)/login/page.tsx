import Image from "next/image";
import logo from '../../../public/login-image-removebg-preview.png';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { raliAPI } from "@/lib/axios/rali-api";

import { cookies } from "next/headers";
import { env } from "@/env";
import { redirect } from "next/navigation";

export default async function LoginPage(){

  const handleLogin = async (formData : FormData) => {
    'use server'

    const email = formData.get('email')
    const password = formData.get('password')

    const response = await raliAPI.post('/sessions', {
      email,
      password
    })

    if(response.status !== 201){
      throw new Error('Error validate')
    }

    const timeExpiresCookie = 60 * 60 * 24 * 7 // 7 days

    const cookie = await cookies()
    cookie.set('session', response.data.access_token, {
      path: '/',
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: timeExpiresCookie
    })

    redirect('/ranking')
  }

  return(
    <div className="w-full h-screen bg-[#141A2F] flex flex-col justify-center items-center">
      <Image src={logo} alt="logo branco FJU" width={250} height={250} />

      <form action={handleLogin}>
        <div className="w-80 flex flex-col gap-6 items-center">
        <Input className="text-white" name="email" type="email" placeholder="Email" />
        <Input className="text-white" name="password" type="password" placeholder="Senha" />
        <Button className="w-40 bg-white font-bold text-[#141A2F] ">Entrar</Button>
      </div>
      </form>

    </div>
  )
}