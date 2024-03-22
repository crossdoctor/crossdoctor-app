import { NextRequest, NextResponse } from "next/server"
import { ApplicationError } from "@/server/errorsEnum"
import { PathRoutesEnum } from "@/server/pathRoutes"
import { MedicalExams } from "@/server/types"
import { fetchFromAPI } from "@/server/utils/fetchFromApi"
import { medicalExamsSchema } from "@/server/validationSchemas"
import * as yup from "yup"

export const dynamic = "force-dynamic"

// Handles GET requests to /api
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const medicalExams = await fetchFromAPI<MedicalExams[]>({
      pathRoute: PathRoutesEnum.MEDICAL_EXAMS,
    })
    const validatedMedicalExams = await Promise.all(
      medicalExams.map((medicalExams) =>
        medicalExamsSchema.validate(medicalExams, {
          strict: true,
          abortEarly: false,
        })
      )
    )

    return NextResponse.json(validatedMedicalExams)
  } catch (error) {
    console.error(error)

    // Se o erro for relacionado à validação do Yup
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors)
      throw new Error(ApplicationError.INVALID_MEDICAL_EXAM_DATA) // Assumindo que você tenha este erro definido
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
