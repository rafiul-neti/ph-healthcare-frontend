"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";

const DoctorApprovalTabs = () => {
  return (
    <Tabs defaultValue="pending">
      <TabsList>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="approved">Approved</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
        <TabsTrigger value="all">All</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        <DoctorApprovalTable />
      </TabsContent>
      <TabsContent value="approved">Approved Table.</TabsContent>
      <TabsContent value="rejected">Rejected Table.</TabsContent>
      <TabsContent value="all">All</TabsContent>
    </Tabs>
  );
};

export default DoctorApprovalTabs;
