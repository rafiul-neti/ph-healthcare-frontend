"use client";

import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDebounce from "@/hooks/debounce.hook";
import type { DoctorQueryParams, DoctorVerificationStatus } from "@/types";
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
  const [tab, setTab] = useState<DoctorVerificationStatus | "ALL">("ALL");
  const [selectedId, setSelectedId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput);

  const queryParams: DoctorQueryParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <>
      <div className="flex items-center justify-between my-5">
        <div className="">
          <Input
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="Search by name or email"
          />
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
        <DoctorApprovalTable
          {...queryParams}
          handleReview={setSelectedId}
          handlePageChange={setPage}
        />
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
