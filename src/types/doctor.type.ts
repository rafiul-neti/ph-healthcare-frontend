import type { User } from "./user.type";

export interface DoctorApplicationData {
  user: {
    name: string;
    email: string;
  };
  doctor: {
    specialization: string;
    licenseNumber: string;
    qualifications: string;
    experienceYears: number;
    contactNumber: string;
    address: string;
    consultationFee: number | undefined;
    bio: string;
  };
}

export interface DoctorApplicationPayload {
  resume: File;
  additionalFiles: File[];
  data: DoctorApplicationData;
}

export interface AdditionalFile {
  url: string;
  publicId: string;
}

export type DoctorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Doctor {
  id: string;
  email: string;
  specialization: string;
  licenseNumber: string;
  qualifications: string;
  experienceYears: number;
  address?: string | null;
  bio?: string | null;
  consultationFee?: string | number | null;
  contactNumber?: string | null;
  resume?: string | null;
  resumePublicId?: string | null;
  additionalFiles?: AdditionalFile[] | null;
  verificationStatus: DoctorVerificationStatus;
  rejectionReason?: string | null;
  reviewedBy?: string | null;
  reviewAt?: string | null;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

export interface DoctorQueryParams {
  verificationStatus?: DoctorVerificationStatus;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "asc" | "desc";
}

export interface ApproveDoctorPayload {
  doctorId: string;
  verificationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}
