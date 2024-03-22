import { NextRequest, NextResponse } from "next/server"
import { ApplicationError } from "@/server/errorsEnum"
import { PathRoutesEnum } from "@/server/pathRoutes"
import { Hospital } from "@/server/types"
import { fetchFromAPI } from "@/server/utils/fetchFromApi"
import { hospitalSchema } from "@/server/validationSchemas"
import * as yup from "yup"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const hospitals = await fetchFromAPI<Hospital>({
      pathRoute: PathRoutesEnum.HOSPITALS,
    })
    const validatedHospitals = await hospitalSchema.validate(hospitals, {
      strict: true,
      abortEarly: false,
    })

    return NextResponse.json(validatedHospitals)
  } catch (error) {
    console.error(error)

    // Se o erro for relacionado à validação do Yup
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors)
      throw new Error(ApplicationError.INVALID_HOSPITAL_DATA) // Assumindo que você tenha este erro definido
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
