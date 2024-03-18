import { env } from "@/env/server"

import { ApplicationError } from "../errorsEnum"
import { PathRoutesEnum } from "../pathRoutes"

/**
 * Fetches data from the API using the provided path route.
 *
 * @param {PathRoutesEnum} pathRoute - The path route for the API endpoint
 * @return {Promise<T>} The fetched data from the API
 */

type FetchFromAPIProps = {
  pathRoute: PathRoutesEnum
  routeProps?: any
  methods?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
}
export async function fetchFromAPI<T>({
  pathRoute,
  routeProps,
  methods = "GET",
}: FetchFromAPIProps): Promise<T> {
  try {
    const accessToken = env.ACCESS_TOKEN || ""
    const withRouteProps = routeProps ? `${pathRoute}/${routeProps}` : pathRoute
    const response = await fetch(`${env.API_URL}${withRouteProps}`, {
      method: methods,
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": accessToken,
      }),
      // next: { revalidate: 30 },
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const data: T = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(ApplicationError.ERROR_FETCHING_DATA_FROM_API)
  }
}
