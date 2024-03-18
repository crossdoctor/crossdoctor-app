"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/server/supabase/client"
import { User } from "@supabase/supabase-js"

import { getFromStorage } from "@/lib/utils"

// Define o tipo do contexto
interface UserAuthProviderType {
  isLoggedIn: boolean
  isLoading: boolean
  userData?: User
}

// Cria o contexto com um valor default
const UserAuthProvider = createContext<UserAuthProviderType | undefined>(
  undefined
)

// Cria um Provider que gerencia o estado 'selectedTab'
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userData, setUserData] = useState<User | undefined>(undefined)
  const { auth } = createClient()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const userFound = getFromStorage("userFound")

  useEffect(() => {
    console.log("Buscando informações do usuário...")

    if (userFound) {
      console.log(userFound, "userFound")
      setIsAuthorized(true)
    }
  }, [userFound])

  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true)
      const session = await auth.getSession()

      console.log(session, "session")
      return session
    }

    getSession().then((session) => {
      const hasSession = !!session.data.session
      console.log(hasSession, "hasSession")
      setUserData(session.data.session?.user)
      setIsLoggedIn(hasSession)
      setIsLoading(false)
      if (!hasSession) {
        router.push("/")
      } else {
        router.push("/dashboard")
      }
    })
  }, [auth, router])

  return (
    <UserAuthProvider.Provider value={{ isLoggedIn, isLoading, userData }}>
      {!isLoading && children}
    </UserAuthProvider.Provider>
  )
}

// Hook personalizado para facilitar o uso do contexto
export function useAuth() {
  const context = useContext(UserAuthProvider)
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider")
  }
  return context
}
