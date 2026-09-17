"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useApproveDoctor, useGetAllDoctors } from "@/hooks";
import type { ApproveDoctorPayload, DoctorQueryParams } from "@/types";

interface Props extends DoctorQueryParams {
  selectedId: string;
  onClose: () => void;
}

const DoctorApprovalSheet = ({
  selectedId,
  onClose,
  ...queryParams
}: Props) => {
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data } = useGetAllDoctors(queryParams);

  const selectedDoctor = data?.data?.find((doctor) => doctor.id === selectedId);
  const { mutate: verify, isPending } = useApproveDoctor();

  if (!selectedDoctor) return null;

  const handleClose = () => {
    setConfirmRejection(false);
    setRejectionReason("");
    onClose();
  };

  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    const reviewData: ApproveDoctorPayload = {
      doctorId: selectedDoctor.id,
      verificationStatus: status,
      rejectionReason,
    };

    verify(reviewData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Something Went Wrong!",
            description: "Internal Server Error. Please Try Again.",
            type: "error",
          });
        }

        toast.add({
          title: `Application ${status === "APPROVED" ? "Approved" : "Rejected"}`,
          description: res.message,
          type: "success",
        });

        handleClose();
      },
      onError: (err) => {
        toast.add({
          title: err.name ?? "Something Went Wrong!",
          description: err.message,
          type: "error",
        });
      },
    });
  };

  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
      <SheetContent side="left" className={`p-5`}>
        <SheetHeader>
          <SheetTitle>Review and take action.</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
        Doctor Name: {selectedDoctor.user.name}
        <SheetFooter>
          {confirmRejection ? (
            <div className="flex flex-col gap-2">
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                maxLength={50}
              />
              <small>{rejectionReason.length}/50 characters</small>

              <div className="flex gap-2">
                <Button
                  onClick={handleClose}
                  variant={`outline`}
                  size={`lg`}
                  className={`flex-1`}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleReviewAction("REJECTED")}
                  variant={`destructive`}
                  size={`lg`}
                  className={`flex-1`}
                  disabled={
                    !rejectionReason ||
                    rejectionReason.trim().length < 40 ||
                    isPending
                  }
                >
                  {isPending ? (
                    <>
                      <Spinner /> Rejecting
                    </>
                  ) : (
                    "Confirm Rejection"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => setConfirmRejection(true)}
                variant={`destructive`}
                size={`lg`}
                className={`flex-1`}
                disabled={isPending}
              >
                Reject
              </Button>
              <Button
                onClick={() => handleReviewAction("APPROVED")}
                variant={`default`}
                size={`lg`}
                className={`flex-1`}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Spinner /> Approving
                  </>
                ) : (
                  "Approve"
                )}
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DoctorApprovalSheet;
