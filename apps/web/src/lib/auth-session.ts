export const AUTH_SESSION_STORAGE_KEY = "qlvmb.auth.session";
export const AUTH_SESSION_UPDATED_EVENT = "qlvmb:auth-session-updated";

export interface AuthSessionUser {
  id: number;
  email: string;
  displayName: string;
  phone: string | null;
  emailVerified: boolean;
  roles: string[];
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExpiresAt: string;
  user: AuthSessionUser;
}

export interface AuthSessionStores {
  localStorage?: Storage;
  sessionStorage?: Storage;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function parseAuthSession(serializedSession: string | null): AuthSession | null {
  if (!serializedSession) {
    return null;
  }

  try {
    const parsedSession = JSON.parse(serializedSession) as Partial<AuthSession> | null;

    if (!parsedSession || typeof parsedSession !== "object") {
      return null;
    }

    const parsedUser = parsedSession.user;
    if (!parsedUser || typeof parsedUser !== "object") {
      return null;
    }

    if (
      typeof parsedSession.accessToken !== "string" ||
      typeof parsedSession.refreshToken !== "string" ||
      typeof parsedSession.tokenType !== "string" ||
      typeof parsedSession.accessTokenExpiresAt !== "string" ||
      typeof parsedUser.id !== "number" ||
      typeof parsedUser.email !== "string" ||
      typeof parsedUser.displayName !== "string" ||
      (parsedUser.phone !== null && typeof parsedUser.phone !== "string") ||
      typeof parsedUser.emailVerified !== "boolean" ||
      !isStringArray(parsedUser.roles)
    ) {
      return null;
    }

    return {
      accessToken: parsedSession.accessToken,
      refreshToken: parsedSession.refreshToken,
      tokenType: parsedSession.tokenType,
      accessTokenExpiresAt: parsedSession.accessTokenExpiresAt,
      user: {
        id: parsedUser.id,
        email: parsedUser.email,
        displayName: parsedUser.displayName,
        phone: parsedUser.phone,
        emailVerified: parsedUser.emailVerified,
        roles: parsedUser.roles
      }
    };
  } catch {
    return null;
  }
}

export function readAuthSessionFromStorage(storage: Storage | undefined): AuthSession | null {
  if (!storage) {
    return null;
  }

  try {
    return parseAuthSession(storage.getItem(AUTH_SESSION_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function saveAuthSessionToStorage(
  storage: Storage | undefined,
  authSession: AuthSession
): void {
  if (!storage) {
    return;
  }

  try {
    storage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(authSession));
  } catch {
    return;
  }
}

export function clearAuthSessionFromStorage(storage: Storage | undefined): void {
  if (!storage) {
    return;
  }

  try {
    storage.removeItem(AUTH_SESSION_STORAGE_KEY);
  } catch {
    return;
  }
}

export function resolveAuthSessionStores(): AuthSessionStores {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage
  };
}

export function notifyAuthSessionUpdated(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_SESSION_UPDATED_EVENT));
}

export function persistAuthSession(
  authSession: AuthSession,
  shouldRemember = true,
  stores: AuthSessionStores = resolveAuthSessionStores()
): void {
  if (shouldRemember) {
    saveAuthSessionToStorage(stores.localStorage, authSession);
    clearAuthSessionFromStorage(stores.sessionStorage);
    notifyAuthSessionUpdated();
    return;
  }

  saveAuthSessionToStorage(stores.sessionStorage, authSession);
  clearAuthSessionFromStorage(stores.localStorage);
  notifyAuthSessionUpdated();
}

export function loadStoredAuthSession(
  stores: AuthSessionStores = resolveAuthSessionStores()
): AuthSession | null {
  return (
    readAuthSessionFromStorage(stores.localStorage) ??
    readAuthSessionFromStorage(stores.sessionStorage)
  );
}

export function clearStoredAuthSession(
  stores: AuthSessionStores = resolveAuthSessionStores()
): void {
  clearAuthSessionFromStorage(stores.localStorage);
  clearAuthSessionFromStorage(stores.sessionStorage);
  notifyAuthSessionUpdated();
}

export function isAuthSessionExpired(
  authSession: AuthSession,
  currentTime = Date.now()
): boolean {
  const expiresAt = Date.parse(authSession.accessTokenExpiresAt);

  if (Number.isNaN(expiresAt)) {
    return true;
  }

  return expiresAt <= currentTime;
}

export function loadActiveAuthSession(
  stores: AuthSessionStores = resolveAuthSessionStores()
): AuthSession | null {
  const authSession = loadStoredAuthSession(stores);

  if (!authSession) {
    return null;
  }

  if (isAuthSessionExpired(authSession)) {
    clearStoredAuthSession(stores);
    return null;
  }

  return authSession;
}
