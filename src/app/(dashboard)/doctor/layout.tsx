import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

const DoctorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["DOCTOR"]}>
      <DashboardShell user_role={`DOCTOR`}>{children}</DashboardShell>
    </RoleGuard>
  );
};

export default DoctorLayout;
