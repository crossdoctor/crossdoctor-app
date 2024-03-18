// import { NextApiRequest } from "next"
// import { NextResponse } from "next/server"

// // Definindo o tipo para os cookies parseados
// interface ParsedCookies {
//   [key: string]: string
// }

// export async function GET(req: NextApiRequest) {
//   const cookies = req.headers.cookie

//   let parsedCookies: ParsedCookies = {}
//   if (cookies) {
//     parsedCookies = cookies
//       .split(";")
//       .reduce((acc: ParsedCookies, cookie: string) => {
//         const [key, value] = cookie.split("=").map((c) => c.trim())
//         acc[key] = decodeURIComponent(value)
//         return acc
//       }, {})
//   }

//   const userCookie = parsedCookies["user-info"]

//   console.log("Cookie encontrado:", cookies)
//   if (userCookie) {
//     console.log("Cookie encontrado:", cookies)
//     return NextResponse.json({ userCookie })
//   } else {
//     console.log("Cookie não encontrado")
//     return NextResponse.json({ userCookie })
//   }
// }

import { NextResponse } from "next/server"
import { PathRoutesEnum } from "@/server/routes/pathRoutes"
import { fetchFromAPI } from "@/server/routes/utils/fetchFromApi"

// Handles GET requests to /api
export async function GET(request: Request) {
  const userFound = await fetchFromAPI({
    pathRoute: PathRoutesEnum.USERS,
    methods: "PATCH",
    routeProps: "3448f442-4ea2-4388-b52c-d1f4d7c32a33",
  })
  return NextResponse.json({ userFound })
}

// Handles POST requests to /api
export async function POST(request: Request) {
  // ...
  return NextResponse.json({ message: "Hello World" })
}
