import { env } from "@/env/server"
import { Logger } from "winston"

import { ApplicationError } from "../errorsEnum"
import { PathRoutesEnum } from "../pathRoutes"

/**
 * Fetches data from an API using the specified path route and route properties.
 *
 * @param {FetchFromAPIProps} {
 * @param {string} pathRoute - The path route to fetch data from
 * @param {string} routeProps - The additional route properties
 * @param {string} methods - The HTTP method to use (default is "GET")
 * @param {any} nextConfig - Additional configurations for the request
 * @param {string} cache - Cache option for the request
 * @return {Promise<T>} The data fetched from the API
 */

type FetchFromAPIProps = {
  pathRoute: PathRoutesEnum
  routeProps?: any
  methods?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  nextConfig?: NextFetchRequestConfig
  cache?: RequestCache
}

export async function fetchFromAPI<T>({
  pathRoute,
  routeProps,
  methods = "GET",
  nextConfig,
  cache,
}: FetchFromAPIProps): Promise<T> {
  if (!env.ACCESS_TOKEN) {
    throw new Error("Access token is missing")
  }
  const logger = new Logger()

  try {
    const accessToken = env.ACCESS_TOKEN
    const withRouteProps = routeProps ? `${pathRoute}/${routeProps}` : pathRoute
    const response = await fetch(`${env.API_URL}${withRouteProps}`, {
      method: methods,
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": accessToken,
      }),
      cache: cache,
      next: nextConfig,
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    let data: T
    try {
      data = await response.json()
    } catch (error) {
      logger.error(error)
      throw new Error(ApplicationError.ERROR_FETCHING_DATA_FROM_API)
    }

    return data
  } catch (error) {
    logger.error(error)
    throw new FetchDataError("Error fetching data from API")
  }
}

export class FetchDataError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "FetchDataError"
  }
}
