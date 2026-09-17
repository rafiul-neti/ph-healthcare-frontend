import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types";
import type {
  ApproveDoctorPayload,
  Doctor,
  DoctorApplicationPayload,
  DoctorQueryParams,
} from "@/types/doctor.type";

export function applyAsDoctor(payload: DoctorApplicationPayload) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  formData.append("resume", payload.resume);

  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/doctor/apply-as-doctor", {
    method: "POST",
    body: formData,
  });
}

export function getAllDoctors(query: DoctorQueryParams) {
  return apiClient<ApiResponse<Doctor[]>>("/doctor/all-doctors", {
    query,
  });
}

export function approveDoctor(payload: ApproveDoctorPayload) {
  return apiClient("/doctor/approve-doctor", {
    method: "POST",
    body: payload,
  });
}
