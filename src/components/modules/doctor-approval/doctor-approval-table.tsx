"use client";

import { SearchX } from "lucide-react";
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
import TablePagination from "@/components/ui/table-pagination";
import { useSuspenseGetAllDoctors } from "@/hooks";
import type { DoctorQueryParams } from "@/types";

interface Props extends DoctorQueryParams {
  handleReview: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

const DoctorApprovalTable = ({
  handleReview,
  handlePageChange,
  ...queryParams
}: Props) => {
  const { data } = useSuspenseGetAllDoctors(queryParams);

  const doctors = data?.data;

  return (
    <>
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
                    {doctor.user.emailVerified ? (
                      <Button
                        variant={`outline`}
                        disabled={
                          doctor.verificationStatus?.toUpperCase() !== "PENDING"
                        }
                        onClick={() => handleReview(doctor.id)}
                      >
                        Review
                      </Button>
                    ) : (
                      <Button variant={`outline`} disabled>
                        Not Verified
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={6}>
                <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                  <span className="rounded-full bg-muted p-3">
                    <SearchX className="size-5 text-muted-foreground" />
                  </span>
                  <p className="font-medium">No doctors found</p>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    {queryParams.searchTerm
                      ? `No results for "${queryParams.searchTerm}". Try a different name or email.`
                      : "There are no doctors in this view yet."}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </Table>
      </div>
      <div className="my-5">
        <TablePagination
          totalPages={data?.meta?.totalPages ?? 1}
          handlePageChange={handlePageChange}
          page={queryParams.page ?? 1}
        />
      </div>
    </>
  );
};

export default DoctorApprovalTable;
