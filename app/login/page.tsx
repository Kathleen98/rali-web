import Image from "next/image";
import logo from '../../public/login-image-removebg-preview.png'

export default function(){

  return(
    <div className="w-full h-screen bg-[#141A2F] flex flex-col justify-center items-center">
      <Image src={logo} alt="logo branco FJU" width={300} height={300} />
    </div>
  )
}