import { PathRoutesEnum } from "@/server/pathRoutes"
import {
  Clinic,
  ExamOffers,
  Hospital,
  MedicalExams,
  OfferContracts,
  User,
} from "@/server/types"
import { useMutation as useRQMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export type RouteDataMap = {
  [PathRoutesEnum.CLINICS]: Clinic[];
  [PathRoutesEnum.USERS]: User[];
  [PathRoutesEnum.EXAM_OFFERS]: ExamOffers[];
  [PathRoutesEnum.MEDICAL_EXAMS]: MedicalExams[];
  [PathRoutesEnum.OFFER_CONTRACTS]: OfferContracts[];
  [PathRoutesEnum.HOSPITALS]: Hospital[];
};


export function useCustomMutation<T extends keyof RouteDataMap>(
    routeType: T,
    options: {
      method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
      onSuccess?: () => void,
      onError?: () => void,
      onSettled?: () => void,
    }
  ) {
    const queryClient = useQueryClient();
  
    const mutationFn = async ({ body, params = '', headers = {} }: { body: any | null; params?: string; headers?: HeadersInit }) => {
      // Constrói a URL baseada em se params é fornecido
      const url = params ? `/api/${routeType}/${params}` : `/api/${routeType}`
      const response = await fetch(url, {
        method: options.method,
        body,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    };
  
    const { mutate, isPending } = useRQMutation({
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [routeType] });
        if (options.onSuccess) options.onSuccess();
      },
      onError: options.onError,
      onSettled: options.onSettled,
    });
  
    return { mutate, isPending };
  }
  