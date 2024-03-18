import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/server/supabase/server"

import LoginSvg from "@/components/ui/Icons/LoginSvg"
import { SubmitButton } from "@/components/ui/submit-button"

export default async function Home({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect("/?message=Could not authenticate user")
    }

    return redirect("/dashboard")
  }

  const signUp = async (formData: FormData) => {
    "use server"

    const origin = headers().get("origin")
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect("/?message=Could not authenticate user")
    }

    return redirect("/?message=Check email to continue sign in process")
  }

  return (
    <main>
      <div className="flex h-screen w-full flex-col items-start overflow-clip sm:flex-row">
        <div className="relative !my-0 hidden h-fit w-full flex-col place-content-center items-center justify-between bg-black  !p-0 sm:flex sm:h-full sm:w-1/2">
          <div className="flex flex-col px-4 pb-10 pt-8 sm:mt-64 sm:py-0">
            <h1 className="pb-4 text-5xl font-bold text-white sm:text-7xl ">
              CrossDoctor
            </h1>
            <p className="block max-w-56 text-text-span">
              of clients are satisfied 😊 with our bank according to the survey
            </p>
          </div>
          <LoginSvg classNames="sm:max-w-3xl " />
        </div>
        <div className="relative flex h-full dark:text-black w-full flex-col place-content-center items-center  justify-evenly bg-white sm:w-1/2">
          <div className="z-10 flex h-fit w-full max-w-lg flex-col   px-4 sm:z-auto">
            <LoginSvg classNames="max-w-[240px] sm:max-w-sm  absolute rotate-180 -top-10 sm:top-0  -right-10" />
            <div className="flex w-full flex-col gap-3  text-center ">
              <span className="text-5xl font-extrabold">Log in</span>
              <span className="pb-8 text-2xl font-semibold">
                Bem-vindo de volta
              </span>
            </div>
            <div className="flex max-w-xl flex-col justify-center gap-4">
              <form className="flex w-full flex-1 dark:text-black flex-col justify-center gap-2 text-foreground animate-in">
                <label className="text-md" htmlFor="email">
                  Email
                </label>
                <input
                  className="rounded-md border border-black bg-inherit px-4 py-2 "
                  name="email"
                  placeholder="you@example.com"
                  required
                />
                <label className="text-md" htmlFor="password">
                  Password
                </label>
                <input
                  className="mb-6 rounded-md border border-black bg-inherit px-4 py-2"
                  type="password"
                  autoComplete="on"
                  name="password"
                  placeholder="••••••••"
                  required
                />
                <SubmitButton
                  formAction={signIn}
                  className="mb-2 rounded-lg bg-black px-4 py-2 text-white"
                  pendingText="Signing In..."
                >
                  Sign In
                </SubmitButton>
                <SubmitButton
                  formAction={signUp}
                  className="mb-2 rounded-lg border border-foreground/20 bg-black px-4 py-2 text-white"
                  pendingText="Signing Up..."
                >
                  Sign Up
                </SubmitButton>
                {searchParams?.message && (
                  <p className="mt-4 p-4  text-center text-black">
                    {searchParams.message}
                  </p>
                )}
              </form>
              <a href="#" className="flex justify-center hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </div>
          <div className="flex h-fit sm:hidden">
            <div className="absolute -bottom-10 left-0  right-0 mx-auto w-full  ">
              <LoginSvg classNames="sm:max-w-3xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
