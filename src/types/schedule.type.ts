export type ScheduleStatus = "DRAFT" | "PUBLISHED";

export interface Schedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
  totalSlots: number;
  availableSlots: number;
  meetingLink: string;
  status: ScheduleStatus;
  doctorId: string;
  createdAt: string;
  updatedAt: string;
} 

// {
//  id: string;
//  startDateTime: Date;
//  endDateTime: Date;
//  totalSlots: number;
//  availableSlots: number;
//  meetingLink: string;
//  status: ScheduleStatus;
//  isDeleted: boolean;
//  deletedAt: Date | null;
//  createdAt: Date;
//  updatedAt: Date;
//  doctorId: string;
// }

export interface CreateSchedulePayload {
  startDateTime: string;
  endDateTime: string;
  meetingLink: string;
}

export interface ScheduleParams {
  status?: ScheduleStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}