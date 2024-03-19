import * as yup from "yup"

import { ApplicationError } from "../errorsEnum"
import { PathRoutesEnum } from "../pathRoutes"
import { OfferContracts } from "../types"
import { fetchFromAPI } from "../utils/fetchFromApi"
import { offerContractsSchema } from "../validationSchemas"

/**
 * Retrieves an offer contract by its ID.
 *
 * @param {Object} params - The parameters for retrieving the offer contract.
 * @param {string} params.id - The ID of the offer contract.
 * @return {Promise<OfferContracts>} A promise that resolves to the retrieved offer contract.
 * @throws {Error} If the offer contract is not found or if there is a validation error.
 */
export async function getOfferContractById({
  id,
}: {
  id: string
}): Promise<OfferContracts> {
  try {
    const offerContract = await fetchFromAPI<OfferContracts>({
      pathRoute: PathRoutesEnum.OFFER_CONTRACTS,
      routeProps: id,
      methods: "GET",
    })
    const validatedofferContract = await offerContractsSchema.validate(
      offerContract,
      {
        strict: true,
        abortEarly: false,
      }
    )

    return validatedofferContract
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors)
      throw new Error(ApplicationError.INVALID_OFFER_CONTRACT_DATA)
    }
    console.error(error)
    throw new Error(ApplicationError.OFFER_CONTRACT_NOT_FOUND)
  }
}
