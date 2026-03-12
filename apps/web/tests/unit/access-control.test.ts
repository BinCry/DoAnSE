import { describe, expect, it } from "vitest";

import {
  canAccessBackofficeModule,
  getAllowedBackofficeModules
} from "@/lib/access-control";

describe("access-control", () => {
  it("cho admin truy cập toàn bộ module nội bộ", () => {
    expect(getAllowedBackofficeModules("system_admin")).toEqual([
      "sales",
      "support",
      "operations",
      "finance",
      "cms",
      "admin"
    ]);
  });

  it("chan ke toan truy cap module dieu hanh", () => {
    expect(canAccessBackofficeModule("finance_staff", "operations")).toBe(
      false
    );
  });

  it("chan khach vang lai vao backoffice", () => {
    expect(getAllowedBackofficeModules("guest")).toEqual([]);
  });
});
