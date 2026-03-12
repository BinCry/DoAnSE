import type { StaffRole, UserRole } from "@qlvmb/shared-types";

export const ROLE_LABELS: Record<UserRole, string> = {
  guest: "Khách vãng lai",
  customer: "Khách hàng",
  member: "Hội viên",
  ticket_agent: "Nhân viên bán vé",
  customer_support: "Nhân viên chăm sóc khách hàng",
  operations_staff: "Nhân viên điều hành",
  finance_staff: "Nhân viên kế toán",
  content_editor: "Biên tập nội dung",
  system_admin: "Quản trị viên hệ thống"
};

export const BACKOFFICE_ACCESS = {
  sales: ["ticket_agent", "system_admin"],
  support: ["customer_support", "system_admin"],
  operations: ["operations_staff", "system_admin"],
  finance: ["finance_staff", "system_admin"],
  cms: ["content_editor", "system_admin"],
  admin: ["system_admin"]
} as const satisfies Record<string, readonly StaffRole[]>;

export type BackofficeModuleKey = keyof typeof BACKOFFICE_ACCESS;

export function canAccessBackofficeModule(
  role: UserRole,
  moduleKey: BackofficeModuleKey
): boolean {
  const allowedRoles = BACKOFFICE_ACCESS[moduleKey] as readonly StaffRole[];

  return allowedRoles.includes(role as StaffRole);
}

export function getAllowedBackofficeModules(
  role: UserRole
): BackofficeModuleKey[] {
  return (Object.keys(BACKOFFICE_ACCESS) as BackofficeModuleKey[]).filter(
    (moduleKey) => canAccessBackofficeModule(role, moduleKey)
  );
}
