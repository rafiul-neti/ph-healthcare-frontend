"use client";

import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllDoctors } from "@/hooks";
import type { DoctorQueryParams } from "@/types";

interface Props extends DoctorQueryParams {
  handleReview: Dispatch<SetStateAction<string>>;
}

const DoctorApprovalTable = ({ handleReview, ...queryParams }: Props) => {
  const { data } = useSuspenseGetAllDoctors(queryParams);

  const doctors = data?.data;

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {doctors.length ? (
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.user.name ?? "-"}</TableCell>
                <TableCell>{doctor.licenseNumber ?? "-"}</TableCell>
                <TableCell>{doctor.email ?? "-"}</TableCell>
                <TableCell>{doctor.contactNumber ?? "-"}</TableCell>
                <TableCell>{doctor.specialization ?? "-"}</TableCell>
                <TableCell>
                  <Button
                    variant={`outline`}
                    onClick={() => handleReview(doctor.id)}
                  >
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="h-48 text-center p-0">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-muted-foreground font-medium text-2xl">
                    Empty
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default DoctorApprovalTable;
