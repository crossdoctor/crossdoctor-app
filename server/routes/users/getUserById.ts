// Importações necessárias
import { ApplicationError } from "../errorsEnum"
import { PathRoutesEnum } from "../pathRoutes"
import { User } from "../types"
import { fetchFromAPI } from "../utils/fetchFromApi"

/**
 * Busca um usuário pelo ID.
 *
 * @param {string} userId - O ID do usuário a ser buscado.
 * @return {Promise<User>} - O usuário encontrado.
 */
export async function getUserById(userId: string): Promise<User> {
  try {
    const user = await fetchFromAPI<User>({
      pathRoute: PathRoutesEnum.USERS,
      methods: "PATCH",
      routeProps: `/${userId}`,
    })
    return user
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    throw new Error(ApplicationError.ERROR_FETCHING_DATA_FROM_API)
  }
}
