
import Login from "@/components/Login/Login";

export default function Home({
  searchParams,
}: {
  searchParams: { message: string };
}) {
 
  
  return (
    <main>
      <Login  searchParams={searchParams} />
    </main>
  );
}
