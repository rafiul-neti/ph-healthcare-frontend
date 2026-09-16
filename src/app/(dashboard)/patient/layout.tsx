import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

const PatientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["PATIENT"]}>
      <DashboardShell user_role={`PATIENT`}>{children}</DashboardShell>
    </RoleGuard>
  );
};

export default PatientLayout;
