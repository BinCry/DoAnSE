import { describe, expect, it } from "vitest";

import {
  canAccessBackofficeModule,
  getAllowedBackofficeModules
} from "@/lib/access-control";

describe("access-control", () => {
  it("cho nhan vien cham soc khach hang truy cap cac module da duoc gop", () => {
    expect(getAllowedBackofficeModules("customer_support")).toEqual([
      "sales",
      "support",
      "finance",
      "cms"
    ]);
  });

  it("cho nhan vien van hanh truy cap dieu hanh va kiem soat", () => {
    expect(getAllowedBackofficeModules("operations_staff")).toEqual([
      "operations",
      "admin"
    ]);
  });

  it("chan nhan vien cham soc khach hang vao module dieu hanh", () => {
    expect(canAccessBackofficeModule("customer_support", "operations")).toBe(false);
  });

  it("chan khach vang lai vao backoffice", () => {
    expect(getAllowedBackofficeModules("guest")).toEqual([]);
  });
});
