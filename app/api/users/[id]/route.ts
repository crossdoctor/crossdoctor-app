import { NextRequest, NextResponse } from "next/server"
import { ApplicationError } from "@/server/errorsEnum"
import { PathRoutesEnum } from "@/server/pathRoutes"
import { User } from "@/server/types"
import { fetchFromAPI } from "@/server/utils/fetchFromApi"
import { userSchema } from "@/server/validationSchemas"
import * as yup from "yup"

export const dynamic = "force-dynamic"
// Handles GET requests to /api
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Fetch users data from API
    const users = await fetchFromAPI<User>({
      pathRoute: PathRoutesEnum.USERS,
      params: {
        id: context.params.id,
      },
    })

    // Validate each user data with Yup schema
    const validatedUsers = await userSchema.validate(users, {
      strict: true,
      abortEarly: false,
    })

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
