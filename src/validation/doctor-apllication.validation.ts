import { z } from "zod";

export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const MAX_ADDITIONAL_FILES = 5;

export const MAX_BIO_LENGTH = 1000;

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

export const getCustomFileSchema = <T>(message: string) =>
  z
    .custom<T>(
      (value) =>
        value === null ||
        (value instanceof File &&
          isAcceptedFileSize(value.size) &&
          isAcceptedFileType(value.type)),
      {
        error: message,
      },
    )
    .refine((value) => value instanceof File, {
      error: "A resume or CV is required.",
    });

export const doctorApplicationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long!"),
  email: z.email("Please enter a valid email address."),
  specialization: z.string().trim().min(2, "Specialization is required"),
  licenseNumber: z.string().trim().min(2, "License Number is required"),
  qualifications: z.string().trim().min(2, "Qualification is required"),
  experienceYears: z
    .string()
    .trim()
    .refine((value) => /^\d+$/.test(value), {
      error: "Years of experience must be a whole value.",
    })
    .refine((value) => Number(value) >= 0 && Number(value) <= 55, {
      error: "Years of experience must be between 0 and 55.",
    }),
  contactNumber: z.string().trim().min(5, "Contact Number is invalid"),
  address: z.string().trim(),
  consultationFee: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || (/^\d+$/.test(value) && Number(value) >= 0),
      { error: "Consultation fee must be a non-zero whole number." },
    ),
  bio: z
    .string()
    .trim()
    .max(MAX_BIO_LENGTH, {
      error: `Bio cannot be exceed ${MAX_BIO_LENGTH} characters.`,
    }),
  resume: getCustomFileSchema<File | null>(
    `Resume must be a PDF, DOC, DOCX, or an image file under ${MAX_FILE_SIZE}MB`,
  ).refine((value) => value instanceof File, {
    error: "A resume or CV is required.",
  }),
  additionalFiles: z
    .array(z.custom<File>((value) => value instanceof File))
    .max(
      MAX_ADDITIONAL_FILES,
      `You can attach at most ${MAX_ADDITIONAL_FILES} supporting documents.`,
    )
    .refine(
      (files) =>
        files.every(
          (file) =>
            isAcceptedFileSize(file.size) && isAcceptedFileType(file.type),
        ),
      {
        error: `Each file must be a PDF, DOC, DOCX, or an image file under ${MAX_FILE_SIZE}MB`,
      },
    ),
});
