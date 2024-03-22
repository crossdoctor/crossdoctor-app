import { NextRequest, NextResponse } from "next/server"
import { ApplicationError } from "@/server/errorsEnum"
import { PathRoutesEnum } from "@/server/pathRoutes"
import { Clinic } from "@/server/types"
import { fetchFromAPI } from "@/server/utils/fetchFromApi"
import { clinicSchema } from "@/server/validationSchemas"
import * as yup from "yup"

export const dynamic = "force-dynamic"

// Handles GET requests to /api
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const clinics = await fetchFromAPI<Clinic[]>({
      pathRoute: PathRoutesEnum.CLINICS,
    })

    const validatedClinics = await Promise.all(
      clinics.map((clinic) =>
        clinicSchema.validate(clinic, { strict: true, abortEarly: false })
      )
    )
    return NextResponse.json(validatedClinics)
  } catch (error) {
    console.error(error)

    // Se o erro for relacionado à validação do Yup
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors)
      throw new Error(ApplicationError.INVALID_CLINIC_DATA) // Assumindo que você tenha este erro definido
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// Handles POST requests to /api

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse JSON body
    const requestBody = await req.json()
    const validatedRequestBody = await clinicSchema.validate(requestBody, {
      strict: true,
      abortEarly: false,
    })
    // Optionally validate requestBody here before making the POST request

    const createClinic = await fetchFromAPI<Clinic>({
      pathRoute: PathRoutesEnum.CLINICS,
      methods: "POST",
      body: JSON.stringify(validatedRequestBody),
    })

    const validatedCreatedClinic = await clinicSchema.validate(createClinic, {
      strict: true,
      abortEarly: false,
    })

    return NextResponse.json(validatedCreatedClinic, { status: 201 }) // Use 201 for created resources
  } catch (error) {
    console.error(error)

    // Similar error handling as in GET
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors)
      return NextResponse.json(
        { error: ApplicationError.INVALID_CLINIC_DATA },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
