export type JwtPayload = Record<string, unknown>;

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  if (typeof globalThis.atob !== "function") {
    return "";
  }

  const binary = globalThis.atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function parseJwtPayload(token: string): JwtPayload | null {
  if (!token) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  try {
    const json = decodeBase64Url(parts[1] ?? "");
    const parsed = JSON.parse(json) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    return parsed as JwtPayload;
  } catch {
    return null;
  }
}

export function readJwtExpirationSeconds(payload: JwtPayload | null): number | null {
  if (!payload) {
    return null;
  }

  const exp = payload["exp"];
  return typeof exp === "number" ? exp : null;
}

export function readJwtStringArray(payload: JwtPayload | null, fieldName: string): string[] {
  if (!payload) {
    return [];
  }

  const value = payload[fieldName];
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}
