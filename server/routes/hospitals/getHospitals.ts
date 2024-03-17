import * as yup from "yup";
import { ApplicationError } from "../errorsEnum";
import { PathRoutesEnum } from "../pathRoutes";
import { Hospital } from "../types";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { hospitalSchema } from "../validationSchemas";

/**
 * Retrieves a list of hospitals from the API, validates the data using a schema, and returns the validated hospitals.
 *
 * @return {Promise<Hospital[]>} An array of Hospital objects representing the validated hospitals.
 */
export async function getHospitals(): Promise<Hospital[]> {
  try {
    const hospitals = await fetchFromAPI<Hospital[]>(PathRoutesEnum.HOSPITALS);
    const validatedHospitals = await Promise.all(
      hospitals.map((hospital) =>
        hospitalSchema.validate(hospital, {
          strict: true,
          abortEarly: false,
        })
      )
    );
    return validatedHospitals;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors);
      throw new Error(ApplicationError.INVALID_HOSPITAL_DATA);
    }
    throw new Error(ApplicationError.HOSPITAL_NOT_FOUND);
  }
}
