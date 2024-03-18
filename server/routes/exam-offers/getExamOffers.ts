import * as yup from "yup"

import { ApplicationError } from "../errorsEnum"
import { PathRoutesEnum } from "../pathRoutes"
import { ExamOffers } from "../types"
import { fetchFromAPI } from "../utils/fetchFromApi"
import { examsOffersSchema } from "../validationSchemas"

/**
 * Retrieves a list of exam offers from the API and validates them.
 *
 * @return {Promise<ExamOffers[]>} A promise that resolves to an array of validated exam offers.
 * @throws {Error} If there is an error during the validation process or if the exam offers are not found.
 */
export async function getExamOffers(): Promise<ExamOffers[]> {
  try {
    const examsOffers = await fetchFromAPI<ExamOffers[]>({
      pathRoute: PathRoutesEnum.EXAM_OFFERS,
    })

    const validatedExamsOffers = await Promise.all(
      examsOffers.map((examsOffers) =>
        examsOffersSchema.validate(examsOffers, {
          strict: true,
          abortEarly: false,
        })
      )
    )
    return validatedExamsOffers
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors)
      throw new Error(ApplicationError.INVALID_EXAM_OFFER_DATA)
    }
    throw new Error(ApplicationError.EXAM_OFFER_NOT_FOUND)
  }
}
