"use client";

import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DoctorVerificationStatus } from "@/types";
import DoctorApprovalSheet from "./doctor-approval-sheet";
import DoctorApprovalTable from "./doctor-approval-table";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";

const verificationStatus: [DoctorVerificationStatus | "ALL", string][] = [
  ["APPROVED", "Approved"],
  ["PENDING", "Pending"],
  ["REJECTED", "Rejected"],
  ["ALL", "All"],
];

const DoctorApprovalTabs = () => {
  const [tab, setTab] = useState("ALL");
  const [selectedId, setSelectedId] = useState("");

  const queryParams = {
    page: 1,
    limit: 10,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
  };

  return (
    <>
      <div className="flex items-center justify-between my-5">
        <div className="">
          <Input type="search" placeholder="Search by name or email" />
        </div>

        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            {verificationStatus.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<DoctorApprovalTableLoading />}>
        <DoctorApprovalTable {...queryParams} handleReview={setSelectedId} />
      </Suspense>

      <DoctorApprovalSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        {...queryParams}
      />
    </>
  );
};

export default DoctorApprovalTabs;
