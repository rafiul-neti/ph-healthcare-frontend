import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createSchedule, mySchedules } from "@/api";
import type { ScheduleParams } from "@/types";

export function useCreateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}

export function useSuspenseMySchedules(query: ScheduleParams) {
  return useSuspenseQuery({
    queryKey: ["suspense-my-schedules", query],
    queryFn: () => mySchedules(query),
  });
}
