export interface MyProfile {
  id: number;
  email: string;
  displayName: string;
  phone: string | null;
  emailVerified: boolean;
  status: string;
  roles: string[];
}

export interface UpdateMyProfilePayload {
  displayName: string;
  phone: string;
}

export interface MyPassenger {
  id: number;
  fullName: string;
  passengerType: string;
  dateOfBirth: string;
  documentType: string;
  documentNumber: string;
  isPrimary: boolean;
}

export interface UpsertMyPassengerPayload {
  fullName: string;
  passengerType: string;
  dateOfBirth: string;
  documentType: string;
  documentNumber: string;
  isPrimary: boolean;
}

interface MyAccountApiErrorResponse {
  message?: string;
  errors?: Record<string, string>;
}

export class MyAccountApiError extends Error {
  status: number;
  errors: Record<string, string>;

  constructor(message: string, status: number, errors: Record<string, string> = {}) {
    super(message);
    this.name = "MyAccountApiError";
    this.status = status;
    this.errors = errors;
  }
}

function sanitizeErrors(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter(
      ([fieldName, fieldMessage]) =>
        typeof fieldName === "string" && typeof fieldMessage === "string"
    )
  );
}

function sanitizeRoles(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function isMyProfile(value: unknown): value is MyProfile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const profile = value as Partial<MyProfile>;

  return (
    typeof profile.id === "number" &&
    typeof profile.email === "string" &&
    typeof profile.displayName === "string" &&
    (profile.phone === null || typeof profile.phone === "string" || typeof profile.phone === "undefined") &&
    typeof profile.emailVerified === "boolean" &&
    typeof profile.status === "string" &&
    Array.isArray(profile.roles)
  );
}

function isMyPassenger(value: unknown): value is MyPassenger {
  if (!value || typeof value !== "object") {
    return false;
  }

  const passenger = value as Partial<MyPassenger>;

  return (
    typeof passenger.id === "number" &&
    typeof passenger.fullName === "string" &&
    typeof passenger.passengerType === "string" &&
    typeof passenger.dateOfBirth === "string" &&
    typeof passenger.documentType === "string" &&
    typeof passenger.documentNumber === "string" &&
    typeof passenger.isPrimary === "boolean"
  );
}

function isMyPassengerList(value: unknown): value is MyPassenger[] {
  return Array.isArray(value) && value.every((item) => isMyPassenger(item));
}

async function buildMyAccountApiError(response: Response): Promise<MyAccountApiError> {
  let apiError: MyAccountApiErrorResponse | null = null;

  try {
    apiError = (await response.json()) as MyAccountApiErrorResponse;
  } catch {
    apiError = null;
  }

  const fallbackMessage =
    response.status === 401
      ? "Phiên đăng nhập đã hết hạn hoặc không hợp lệ."
      : "Không thể tải dữ liệu tài khoản lúc này.";
  const message =
    typeof apiError?.message === "string" && apiError.message.trim()
      ? apiError.message
      : fallbackMessage;

  return new MyAccountApiError(message, response.status, sanitizeErrors(apiError?.errors));
}

function getMyAccountApiBaseUrl(): string {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!configuredBaseUrl) {
    return "http://localhost:8080";
  }

  return configuredBaseUrl.replace(/\/+$/, "");
}

function normalizeMyProfile(payload: MyProfile): MyProfile {
  return {
    ...payload,
    phone: payload.phone ?? null,
    roles: sanitizeRoles(payload.roles)
  };
}

async function sendProfileMutation(
  accessToken: string,
  endpoint: string,
  method: "GET" | "PATCH",
  payload?: UpdateMyProfilePayload
): Promise<MyProfile> {
  let response: Response;

  try {
    response = await fetch(`${getMyAccountApiBaseUrl()}${endpoint}`, {
      method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...(payload
          ? {
              "Content-Type": "application/json"
            }
          : {})
      },
      ...(payload
        ? {
            body: JSON.stringify(payload)
          }
        : {}),
      cache: "no-store"
    });
  } catch {
    throw new MyAccountApiError("Không thể kết nối tới máy chủ tài khoản.", 0);
  }

  if (!response.ok) {
    throw await buildMyAccountApiError(response);
  }

  const result = (await response.json()) as unknown;

  if (!isMyProfile(result)) {
    throw new MyAccountApiError("Dữ liệu hồ sơ trả về không hợp lệ.", 500);
  }

  return normalizeMyProfile(result);
}

export function fetchMyProfile(accessToken: string): Promise<MyProfile> {
  return sendProfileMutation(accessToken, "/api/me/profile", "GET");
}

export function updateMyProfile(
  accessToken: string,
  payload: UpdateMyProfilePayload
): Promise<MyProfile> {
  return sendProfileMutation(accessToken, "/api/me/profile", "PATCH", payload);
}

export async function fetchMyPassengers(accessToken: string): Promise<MyPassenger[]> {
  let response: Response;

  try {
    response = await fetch(`${getMyAccountApiBaseUrl()}/api/me/passengers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      cache: "no-store"
    });
  } catch {
    throw new MyAccountApiError("Không thể kết nối tới máy chủ tài khoản.", 0);
  }

  if (!response.ok) {
    throw await buildMyAccountApiError(response);
  }

  const payload = (await response.json()) as unknown;

  if (!isMyPassengerList(payload)) {
    throw new MyAccountApiError("Dữ liệu hành khách trả về không hợp lệ.", 500);
  }

  return payload;
}

async function sendPassengerMutation(
  accessToken: string,
  endpoint: string,
  method: "POST" | "PATCH",
  payload: UpsertMyPassengerPayload
): Promise<MyPassenger> {
  let response: Response;

  try {
    response = await fetch(`${getMyAccountApiBaseUrl()}${endpoint}`, {
      method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      cache: "no-store"
    });
  } catch {
    throw new MyAccountApiError("Không thể kết nối tới máy chủ tài khoản.", 0);
  }

  if (!response.ok) {
    throw await buildMyAccountApiError(response);
  }

  const result = (await response.json()) as unknown;

  if (!isMyPassenger(result)) {
    throw new MyAccountApiError("Dữ liệu hành khách trả về không hợp lệ.", 500);
  }

  return result;
}

export function createMyPassenger(
  accessToken: string,
  payload: UpsertMyPassengerPayload
): Promise<MyPassenger> {
  return sendPassengerMutation(accessToken, "/api/me/passengers", "POST", payload);
}

export function updateMyPassenger(
  accessToken: string,
  passengerId: number,
  payload: UpsertMyPassengerPayload
): Promise<MyPassenger> {
  return sendPassengerMutation(accessToken, `/api/me/passengers/${passengerId}`, "PATCH", payload);
}

export async function deleteMyPassenger(
  accessToken: string,
  passengerId: number
): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`${getMyAccountApiBaseUrl()}/api/me/passengers/${passengerId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      cache: "no-store"
    });
  } catch {
    throw new MyAccountApiError("Không thể kết nối tới máy chủ tài khoản.", 0);
  }

  if (!response.ok) {
    throw await buildMyAccountApiError(response);
  }
}
