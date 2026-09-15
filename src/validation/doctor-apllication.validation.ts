import { z } from "zod";

export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const MAX_ADDITIONAL_FILES = 5;

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

export function isAcceptedFileSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE_BYTES;
}

export function isAcceptedFileType(fileType: string) {
  return ACCEPTED_FILE_TYPES.includes(fileType);
}

export const doctorApplicationSchema = z.object({
  user: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long!"),
    email: z.email("Please enter a valid email address."),
  }),
  doctor: z.object({
    specialization: z.string().trim().min(2, "Specialization is required"),
    licenseNumber: z.string().trim().min(2, "License Number is required"),
    qualifications: z.string().trim().min(2, "Qualification is required"),
    experienceYears: z.string().trim(),
    contactNumber: z.string().trim().min(5, "Contact Number is invalid"),
    address: z.string().trim(),
    consultationFee: z.string().trim(),
    bio: z.string().trim(),
  }),
});
