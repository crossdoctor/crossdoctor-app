import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CrossDoctor',
  description: "Making our life easier!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const supabase = createServerComponentClient<Database>({ cookies });

	// const {
	// 	data: { session }
	// } = await supabase.auth.getSession();

  return (
    <html>
      <body className={inter.className}>
      {/* <Login session={session} /> */}
        {children}</body>
    </html>
  );
}
