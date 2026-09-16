import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <RoleGuard roles={["ADMIN", "SUPER_ADMIN"]}>{children}</RoleGuard>;
};

export default AdminLayout;
