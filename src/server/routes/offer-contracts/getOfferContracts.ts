import * as yup from "yup";
import { ApplicationError } from "../errorsEnum";
import { PathRoutesEnum } from "../pathRoutes";
import { OfferContracts } from "../types";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { offerContractsSchema } from "../validationSchemas";

/**
 * Retrieves a list of offer contracts from the API and performs validation on each contract.
 *
 * @return {Promise<OfferContracts[]>} A promise that resolves to an array of validated offer contracts.
 * @throws {Error} If there is an error during the API fetch or validation.
 */
export async function getOfferContracts(): Promise<OfferContracts[]> {
  try {
    const offerContracts = await fetchFromAPI<OfferContracts[]>(
      PathRoutesEnum.OFFER_CONTRACTS
    );
    const validatedofferContracts = await Promise.all(
      offerContracts.map((offerContracts) =>
        offerContractsSchema.validate(offerContracts, {
          strict: true,
          abortEarly: false,
        })
      )
    );

    return validatedofferContracts;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors);
      throw new Error(ApplicationError.INVALID_OFFER_CONTRACT_DATA);
    }
    console.error(error);
    throw new Error(ApplicationError.OFFER_CONTRACT_NOT_FOUND);
  }
}
