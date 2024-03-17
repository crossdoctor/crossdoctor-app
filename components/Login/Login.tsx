

import LoginSvg from "@/Icons/LoginSvg";
import { SubmitButton } from "@/app/login/submit-button";
import { createClient } from "@/server/supabase/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };
return  (
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
          <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
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
