import * as yup from "yup";
import { ApplicationError } from "../errorsEnum";
import { PathRoutesEnum } from "../pathRoutes";
import { Clinic } from "../types";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { clinicSchema } from "../validationSchemas";

/**
 * Retrieves a list of clinics from the API and performs validation on each clinic.
 *
 * @return {Promise<Clinic[]>} A promise that resolves to an array of validated clinics.
 * @throws {Error} If there is an error during the API request or validation.
 */
export async function getClinics(): Promise<Clinic[]> {
  try {
    const clinics = await fetchFromAPI<Clinic[]>(PathRoutesEnum.CLINICS);

    const validatedClinics = await Promise.all(
      clinics.map((clinic) =>
        clinicSchema.validate(clinic, { strict: true, abortEarly: false })
      )
    );

    return validatedClinics;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors);
      throw new Error(ApplicationError.INVALID_CLINIC_DATA);
    }
    throw new Error(ApplicationError.CLINIC_NOT_FOUND);
  }
}
