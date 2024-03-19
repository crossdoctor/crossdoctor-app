import * as yup from "yup"

import { ApplicationError } from "../errorsEnum"
import { PathRoutesEnum } from "../pathRoutes"
import { Clinic } from "../types"
import { fetchFromAPI } from "../utils/fetchFromApi"
import { clinicSchema } from "../validationSchemas"

type CreateClinicProps = {
  data: Partial<Clinic>
}

export async function createClinic({
  data,
}: CreateClinicProps): Promise<Clinic> {
  try {
    const createClinic = await fetchFromAPI<Clinic[]>({
      pathRoute: PathRoutesEnum.CLINICS,
      methods: "POST",
      body: JSON.stringify(data),
    })

    const validatedCreatedClinic = await clinicSchema.validate(createClinic, {
      strict: true,
      abortEarly: false,
    })

    return validatedCreatedClinic
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors)
      throw new Error(ApplicationError.INVALID_CLINIC_DATA)
    }
    throw new Error(ApplicationError.CANNOT_CREATE_CLINIC)
  }
}
