'use client'

import LoginSvg from "@/Icons/LoginSvg";
import { createClient } from "@/server/supabase/client";
import { Provider, Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default async function Login({ session }: { session: Session | null }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  const signInWithOauth = (provider: Provider) => {
    void createClient().auth.signInWithOAuth({
        provider: provider,
    });
};
return session ? (
  <Button onClick={handleSignOut}>Sign out</Button>
) : (
    <div className="w-full h-screen flex-col overflow-clip flex sm:flex-row items-start">
      <div className="relative hidden sm:flex bg-black w-full !my-0 !p-0 sm:w-1/2 h-fit sm:h-full  flex-col justify-between items-center place-content-center">
        <div className="pt-8 pb-10 sm:py-0 sm:mt-64 px-4 flex flex-col">
          <h1 className="text-white text-5xl sm:text-7xl font-bold pb-4 ">
            CrossDoctor
          </h1>
          <p className="text-text-span block max-w-56">
            of clients are satisfied 😊 with our bank according to the survey
          </p>
        </div>
        <LoginSvg classNames="sm:max-w-3xl " />
      </div>
      <div className="w-full sm:w-1/2 h-full bg-white flex flex-col justify-evenly  relative items-center place-content-center">
       
        <div className="max-w-lg px-4 w-full h-fit flex flex-col   z-10 sm:z-auto">
        <LoginSvg classNames="max-w-[240px] sm:max-w-sm  absolute rotate-180 -top-10 sm:top-0  -right-10" />
          <div className="w-full flex flex-col gap-3  text-center ">
            <span className="font-extrabold text-5xl">Log in</span>
            <span className="font-semibold text-2xl pb-8">
              Bem-vindo de volta
            </span>
          </div>
          <div className="max-w-xl flex flex-col gap-4 justify-center">
            
            <Input
              type="email"
              className="rounded-full bg-gray-300"
              placeholder="Email"
              name="email" onChange={(e) => setEmail(e.target.value)} value={email}
            />
            <Input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-full bg-gray-300"
              placeholder="Password"
            />
            <Button onClick={handleSignUp}>Sign up</Button>
            <Button onClick={handleSignIn}>Sign in</Button>
            <Button onClick={() => signInWithOauth("google")} className="rounded-full ">Google</Button>
            <a href="#" className="flex justify-center hover:underline">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
        <div className="flex sm:hidden h-fit">
          <div className="absolute w-full mx-auto  -bottom-10 left-0 right-0  ">
            <LoginSvg classNames="sm:max-w-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
