import { NextRequest, NextResponse } from "next/server"
import { ApplicationError } from "@/server/errorsEnum"
import { PathRoutesEnum } from "@/server/pathRoutes"
import { ExamOffers } from "@/server/types"
import { fetchFromAPI } from "@/server/utils/fetchFromApi"
import { examsOffersSchema } from "@/server/validationSchemas"
import * as yup from "yup"

export const dynamic = "force-dynamic"

// Handles GET requests to /api
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const examsOffers = await fetchFromAPI<ExamOffers>({
      pathRoute: PathRoutesEnum.EXAM_OFFERS,
      params: {
        id: context.params.id,
      },
    })

    const validatedExamsOffers = await examsOffersSchema.validate(examsOffers, {
      strict: true,
      abortEarly: false,
    })

    return NextResponse.json(validatedExamsOffers)
  } catch (error) {
    console.error(error)

    // Se o erro for relacionado à validação do Yup
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors)
      throw new Error(ApplicationError.INVALID_EXAM_OFFER_DATA) // Assumindo que você tenha este erro definido
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
