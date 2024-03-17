import * as yup from "yup";
import { ApplicationError } from "../errorsEnum";
import { PathRoutesEnum } from "../pathRoutes";
import { MedicalExams } from "../types";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { medicalExamsSchema } from "../validationSchemas";

/**
 * Retrieves medical exams from the API, validates them, and returns the validated exams.
 *
 * @return {Promise<MedicalExams[]>} The list of validated medical exams
 */
export async function getMedicalExams(): Promise<MedicalExams[]> {
  try {
    const medicalExams = await fetchFromAPI<MedicalExams[]>(
      PathRoutesEnum.MEDICAL_EXAMS
    );
    const validatedMedicalExams = await Promise.all(
      medicalExams.map((medicalExams) =>
        medicalExamsSchema.validate(medicalExams, {
          strict: true,
          abortEarly: false,
        })
      )
    );
    return validatedMedicalExams;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors);
      throw new Error(ApplicationError.INVALID_MEDICAL_EXAM_DATA);
    }
    throw new Error(ApplicationError.EXAM_OFFER_NOT_FOUND);
  }
}
