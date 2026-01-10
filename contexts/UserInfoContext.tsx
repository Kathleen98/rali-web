'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

// Interface do UserInfo (ajuste conforme seu tipo existente)
export interface UserInfo {
        id: string,
        name: string,
        email: string,
        role: string,
        groupId: string,
      }

interface UserContextData {
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo | null) => void;
  updateUserInfo: (data: Partial<UserInfo>) => void;
  clearUserInfo: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega dados do cookie na inicialização
  useEffect(() => {
    const loadUserFromCookies = () => {
      try {
        const userCookie = Cookies.get("user_infos");
        
        if (userCookie) {
          const parsedUser = JSON.parse(userCookie);
          setUserInfoState(parsedUser);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário dos cookies:", error);
        setUserInfoState(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromCookies();
  }, []);

  // Atualiza o estado e os cookies
  const setUserInfo = (user: UserInfo | null) => {
    if (user) {
      Cookies.set("user_info", JSON.stringify(user), {
        expires: 7, // 7 dias
        path: "/",
        sameSite: "strict",
      });
      setUserInfoState(user);
    } else {
      Cookies.remove("user_info");
      setUserInfoState(null);
    }
  };

  // Atualiza parcialmente os dados do usuário
  const updateUserInfo = (data: Partial<UserInfo>) => {
    if (userInfo) {
      const updatedUser = { ...userInfo, ...data };
      setUserInfo(updatedUser);
    }
  };

  // Limpa os dados do usuário
  const clearUserInfo = () => {
    Cookies.remove("user_info");
    setUserInfoState(null);
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        updateUserInfo,
        clearUserInfo,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }

  return context;
}