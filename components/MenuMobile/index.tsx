import { Flash, Rank, Weight } from "iconsax-reactjs";
import Image from "next/image";
import logoFju from "../../public/login-image-removebg-preview.png";
import { ListCheck } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { userInfoProps } from "@/@types/user/user_info";

export async function MobileMenu() {
  const cookie = await cookies();
  const userInfosFromCookies = cookie.get("user_infos")?.value;
  const userInfo: userInfoProps = userInfosFromCookies
    ? JSON.parse(userInfosFromCookies)
    : {};

  return (
    <>
      <div className="fixed z-99 bg-black flex justify-center top-0 right-0 left-0  w-full">
        <Image src={logoFju} width={100} height={100} alt="logo FJU branco" />
      </div>

      <div className="w-full flex justify-around items-center fixed bottom-0 z-50 p-2 bg-black ">
        <Link href="/ranking">
          <div className="flex flex-col items-center">
            <Rank variant="Bold" size="20" color="white" />
            <p className="text-xs text-white">Ranking</p>
          </div>
        </Link>

        <Link href="/challenges">
          <div className="flex flex-col items-center">
            <Weight variant="Bold" size="20" color="white" />
            <p className="text-xs text-white">Desafios</p>
          </div>
        </Link>

        <Link href="/flash-missions">
          <div className="flex flex-col items-center">
            <Flash variant="Bold" size="20" color="white" />
            <p className="text-xs text-white">Missões</p>
          </div>
        </Link>

        {userInfo.role === "COORD" ? (
          <Link href="/submissions">
            <div className="flex flex-col items-center">
              <ListCheck size="20" color="white" />
              <p className="text-xs text-white">Envios</p>
            </div>
          </Link>
        ) : null}
      </div>
    </>
  );
}
