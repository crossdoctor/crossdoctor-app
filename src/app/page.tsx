
"use client"
import Login from "@/components/Login/Login";
import { createClient } from "@/server/supabase/client";

export default async function Home() {
  
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  
  return (
    <main>
      <Login  session={session}/>
    </main>
  );
}
