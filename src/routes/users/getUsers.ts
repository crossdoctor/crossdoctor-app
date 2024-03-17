import * as yup from "yup";
import { ApplicationError } from "../errorsEnum";
import { PathRoutesEnum } from "../pathRoutes";
import { User } from "../types";
import { fetchFromAPI } from "../utils/fetchFromApi";
import { userSchema } from "../validationSchemas";

/**
 * Fetches users data from API, validates each user data with Yup schema, and returns validated users array.
 *
 * @return {Promise<User[]>} The array of validated users
 */
export async function getUsers(): Promise<User[]> {
  try {
    // Fetch users data from API
    const users = await fetchFromAPI<User[]>(PathRoutesEnum.USERS);

    // Validate each user data with Yup schema
    const validatedUsers = await Promise.all(
      users.map((user) =>
        userSchema.validate(user, { strict: true, abortEarly: false })
      )
    );

    return validatedUsers;
  } catch (error) {
    console.error(error);

    // Se o erro for relacionado à validação do Yup
    if (error instanceof yup.ValidationError) {
      console.error("Validation error:", error.errors);
      throw new Error(ApplicationError.INVALID_USER_DATA); // Assumindo que você tenha este erro definido
    }

    throw new Error(ApplicationError.USER_NOT_FOUND);
  }
}
