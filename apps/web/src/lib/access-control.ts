import type { StaffRole, UserRole } from "@qlvmb/shared-types";

export const ROLE_LABELS: Record<UserRole, string> = {
  guest: "Khách vãng lai",
  customer: "Khách hàng",
  member: "Hội viên",
  customer_support: "Nhân viên chăm sóc khách hàng",
  operations_staff: "Nhân viên vận hành"
};

export const BACKOFFICE_ACCESS = {
  sales: ["customer_support"],
  support: ["customer_support"],
  operations: ["operations_staff"],
  finance: ["customer_support"],
  cms: ["customer_support"],
  admin: ["operations_staff"]
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
