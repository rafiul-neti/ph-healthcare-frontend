import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  BookAppointmentPayload,
  BookAppointmentResponse,
  MyAppointment,
} from "@/types";

export function bookAppointment(payload: BookAppointmentPayload) {
  return apiClient<ApiResponse<BookAppointmentResponse>>(
    "/appointment/book-appointment",
    {
      method: "POST",
      body: payload,
    },
  );
}

export function getMyAppointments(query: { page?: number; limit?: number }) {
  return apiClient<ApiResponse<MyAppointment[]>>("appointment/my-appointments", { query });
}
