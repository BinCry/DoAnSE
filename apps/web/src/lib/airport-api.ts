import type { AirportOption } from "@qlvmb/shared-types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

function laChuoi(giaTri: unknown): giaTri is string {
  return typeof giaTri === "string";
}

function laSanBayHopLe(giaTri: unknown): giaTri is AirportOption {
  if (!giaTri || typeof giaTri !== "object") {
    return false;
  }

  const banGhi = giaTri as Record<string, unknown>;

  return (
    laChuoi(banGhi.code) &&
    laChuoi(banGhi.cityName) &&
    laChuoi(banGhi.airportName) &&
    laChuoi(banGhi.terminalLabel)
  );
}

export async function fetchAirportOptions(
  query: string,
  signal?: AbortSignal
): Promise<AirportOption[]> {
  const tuKhoa = query.trim();

  if (!tuKhoa) {
    return [];
  }

  const params = new URLSearchParams({ query: tuKhoa });
  const response = await fetch(`${API_BASE_URL}/api/airports?${params.toString()}`, {
    cache: "no-store",
    signal
  });

  if (!response.ok) {
    throw new Error("Không tải được dữ liệu sân bay.");
  }

  const payload = await response.json();

  if (!Array.isArray(payload)) {
    return [];
  }

  return payload.filter(laSanBayHopLe);
}
