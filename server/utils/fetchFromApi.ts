import { env } from "@/env/server"
import axios from "axios"
import { undefined } from "zod"

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
  params?: {
    id: string
  }
  methods?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  nextConfig?: NextFetchRequestConfig
  cache?: RequestCache
  body?: BodyInit | null
}

export async function fetchFromAPI<T>({
  pathRoute,
  params,
  methods = "GET",
  body = null,
  cache,
}: FetchFromAPIProps): Promise<T> {
  if (!env.ACCESS_TOKEN) {
    throw new Error("Access token is missing")
  }

  const url = params
    ? `${env.API_URL}${pathRoute}/${params.id}`
    : `${env.API_URL}${pathRoute}`
  try {
    const { data } = await axios(url, {
      method: methods,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": env.ACCESS_TOKEN,
      },

      data: body ? body : undefined,
      // Axios does not directly support the 'cache' option like fetch, but you can configure cache behavior on a per-request basis using interceptors or external libraries
    })
    console.log(data)
    return data.items
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Fetch error:", error.message)
      throw new Error(ApplicationError.ERROR_FETCHING_DATA_FROM_API)
    } else {
      throw new Error("An unexpected error occurred")
    }
  }
}
