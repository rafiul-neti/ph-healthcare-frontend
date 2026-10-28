import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  ApproveDoctorPayload,
  Doctor,
  DoctorApplicationPayload,
  DoctorQueryParams,
  PublicDoctorParams,
  PublicDoctorProfile,
  Schedule,
} from "@/types";

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

export function getAllPublicDoctors(query: PublicDoctorParams) {
  return apiClient<ApiResponse<PublicDoctorProfile[]>>(
    "/doctor/public/all-doctors",
    { query },
  );
}

export function getPublicDoctorProfile(doctorId: string) {
  return apiClient<ApiResponse<PublicDoctorProfile>>(
    `/doctor/public/${doctorId}`,
  );
}

export function getTodaysScheduleByDoctor(query: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) {
  return apiClient<
    ApiResponse<(Schedule & { isDeleted: boolean; deletedAt: Date | null })[]>
  >("/schedule/todays-schedule", {
    query,
  });
}
