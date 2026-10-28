import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  applyAsDoctor,
  approveDoctor,
  getAllDoctors,
  getAllPublicDoctors,
  getPublicDoctorProfile,
  getTodaysScheduleByDoctor,
} from "@/api";
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

export function useGetAllPublicDoctors(query: DoctorQueryParams) {
  return useQuery({
    queryKey: ["doctor", "public", query],
    queryFn: () => getAllPublicDoctors(query),
  });
}

export function useSuspenseGetAllPublicDoctors(query: DoctorQueryParams) {
  return useSuspenseQuery({
    queryKey: ["doctor", "public", query],
    queryFn: () => getAllPublicDoctors(query),
  });
}

export function usePublicDoctorProfile(doctorId: string) {
  return useQuery({
    queryKey: ["doctor", "public", doctorId],
    queryFn: () => getPublicDoctorProfile(doctorId),
    enabled: !!doctorId,
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
    },
  });
}

export function useGetTodaysScheduleByDoctor(queryParams: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["schedule", queryParams],
    queryFn: () => getTodaysScheduleByDoctor(queryParams),
  });
}
