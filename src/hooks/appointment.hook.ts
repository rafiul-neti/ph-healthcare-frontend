import { useMutation, useQuery } from "@tanstack/react-query";
import { bookAppointment, getMyAppointments } from "@/api";

export function useBookAppointment() {
  return useMutation({
    mutationFn: bookAppointment,
  });
}

export function useGetMyAppointments(appointmentQuery: {
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["my-appointments"],
    queryFn: () => getMyAppointments(appointmentQuery),
  });
}
