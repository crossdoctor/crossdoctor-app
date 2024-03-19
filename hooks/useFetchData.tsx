import { useEffect, useState } from "react"
import { PathRoutesEnum } from "@/server/routes/pathRoutes"
import { Clinic, User } from "@/server/routes/types"

type RouteDataMap = {
  [PathRoutesEnum.CLINICS]: Clinic[]
  [PathRoutesEnum.USERS]: User[]
}

function useFetchData<T extends keyof RouteDataMap>(
  routeType: T
): {
  loading: boolean
  data: { type: T; data: RouteDataMap[T] } | null
} {
  const [data, setData] = useState<{ type: T; data: RouteDataMap[T] } | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = `/api/${routeType}`

    fetch(url)
      .then((res) => res.json())
      .then((responseData) => {
        // O TypeScript agora pode inferir corretamente que responseData é do tipo RouteDataMap[T]
        setData({ type: routeType, data: responseData })
        setLoading(false)
      })
      .catch((error) => {
        console.error("Fetch error: ", error)
        setLoading(false)
      })
  }, [routeType])

  return { loading, data }
}

export default useFetchData
