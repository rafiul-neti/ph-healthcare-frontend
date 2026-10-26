import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  CreateSchedulePayload,
  Schedule,
  ScheduleParams,
} from "@/types";

export function createSchedule(payload: CreateSchedulePayload) {
  return apiClient<ApiResponse<Schedule>>("/schedule/create-schedule", {
    method: "POST",
    body: payload,
  });
}

export function mySchedules(query: ScheduleParams) {
  return apiClient("/schedule/my-schedules", {
    query,
  });
}
