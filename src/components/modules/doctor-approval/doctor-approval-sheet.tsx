"use client";

import {
  BadgeCheck,
  Mail,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

  const detailRow = (label: string, value?: string | number | null) => (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="text-right font-medium wrap-break-words">
        {value ?? <span className="font-normal text-muted-foreground">—</span>}
      </span>
    </div>
  );

  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
      <SheetContent side="left" className={`p-5 gap-0 sm:max-w-md`}>
        <SheetHeader className="border-b">
          <SheetTitle>Review doctor application</SheetTitle>
          <SheetDescription>
            Verify the details below before approving or rejecting. This action
            cannot be undone.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
          <div className="flex items-start gap-3">
            <span className="rounded-full bg-primary/10 p-2.5">
              <Stethoscope className="size-5 text-primary" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold">
                {selectedDoctor.user.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedDoctor.specialization}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Contact
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate" title={selectedDoctor.email}>
                {selectedDoctor.email}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="size-4 shrink-0 text-muted-foreground" />
              <span>{selectedDoctor.contactNumber ?? "—"}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Credentials
            </p>
            {detailRow("License no.", selectedDoctor.licenseNumber)}
            {detailRow("Qualifications", selectedDoctor.qualifications)}
            {detailRow(
              "Experience",
              selectedDoctor.experienceYears != null
                ? `${selectedDoctor.experienceYears} yrs`
                : null,
            )}
            {detailRow(
              "Consultation fee",
              selectedDoctor.consultationFee != null
                ? `$${selectedDoctor.consultationFee}`
                : null,
            )}
          </div>

          {selectedDoctor.bio && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Bio
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedDoctor.bio}
                </p>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Verification
            </p>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="size-4 shrink-0 text-muted-foreground" />
              <span>{selectedDoctor.verificationStatus}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BadgeCheck className="size-4 shrink-0 text-muted-foreground" />
              <span>
                {selectedDoctor.user.emailVerified
                  ? "Email verified"
                  : "Email not verified"}
              </span>
            </div>
          </div>
        </div>

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
