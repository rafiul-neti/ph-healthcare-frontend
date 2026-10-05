import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { applyAsDoctor, approveDoctor, getAllDoctors } from "@/api";
import type { DoctorQueryParams } from "@/types";

export function useApplyAsDoctor() {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
}

export function useGetAllDoctors(query: DoctorQueryParams) {
  return useQuery({
    queryKey: ["doctors", query],
    queryFn: () => getAllDoctors(query),
  });
}

export function useSuspenseGetAllDoctors(query: DoctorQueryParams) {
  return useSuspenseQuery({
    queryKey: ["doctors-suspense", query],
    queryFn: () => getAllDoctors(query),
  });
}

export function useApproveDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors-suspense"] });
    }
  });
}
