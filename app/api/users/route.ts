import { NextResponse } from "next/server"
import { ApplicationError } from "@/server/routes/errorsEnum"
import { PathRoutesEnum } from "@/server/routes/pathRoutes"
import { User } from "@/server/routes/types"
import { fetchFromAPI } from "@/server/routes/utils/fetchFromApi"
import { userSchema } from "@/server/routes/validationSchemas"
import * as yup from "yup"

// Handles GET requests to /api
export async function GET(request: Request) {
  try {
    // Fetch users data from API
    const users = await fetchFromAPI<User[]>({
      pathRoute: PathRoutesEnum.USERS,
    })

    // Validate each user data with Yup schema
    const validatedUsers = await Promise.all(
      users.map((user) =>
        userSchema.validate(user, { strict: true, abortEarly: false })
      )
    )

    return NextResponse.json(validatedUsers)
  } catch (error) {
    console.error(error)

    // Se o erro for relacionado à validação do Yup
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors)
      throw new Error(ApplicationError.INVALID_USER_DATA) // Assumindo que você tenha este erro definido
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// Handles POST requests to /api
export async function POST(request: Request) {
  // ...
  return NextResponse.json({ message: "Hello World" })
}
