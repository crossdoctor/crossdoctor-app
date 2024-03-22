import { PathRoutesEnum } from "@/server/pathRoutes"
import {
  Clinic,
  ExamOffers,
  Hospital,
  MedicalExams,
  OfferContracts,
  User,
} from "@/server/types"
import { useQuery } from "@tanstack/react-query"

type RouteDataMap = {
  [PathRoutesEnum.CLINICS]: Clinic[]
  [PathRoutesEnum.USERS]: User[]
  [PathRoutesEnum.EXAM_OFFERS]: ExamOffers[]
  [PathRoutesEnum.MEDICAL_EXAMS]: MedicalExams[]
  [PathRoutesEnum.OFFER_CONTRACTS]: OfferContracts[]
  [PathRoutesEnum.HOSPITALS]: Hospital[]
}

async function fetchData<T extends keyof RouteDataMap>(
  routeType: T,
  params?: string
): Promise<RouteDataMap[T]> {
  const url = params ? `/api/${routeType}/${params}` : `/api/${routeType}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json() as Promise<RouteDataMap[T]>
}

function useFetchData<T extends keyof RouteDataMap>(routeType: T) {
  const result = useQuery<RouteDataMap[T], Error>({
    queryKey: [routeType],
    queryFn: () => fetchData(routeType),
  })

  return {
    loading: result.isLoading,
    data: result.data ? { type: routeType, data: result.data } : null,
    error: result.error,
  }
}

export default useFetchData
