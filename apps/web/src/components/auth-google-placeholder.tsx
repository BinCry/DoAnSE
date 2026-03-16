"use client";

interface AuthGooglePlaceholderProps {
  buttonLabel: string;
  helperText: string;
}

function GoogleMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#EA4335"
        d="M12.24 10.285v3.934h5.489c-.221 1.269-.958 2.344-2.07 3.067l3.349 2.6c1.95-1.796 3.072-4.434 3.072-7.568 0-.723-.065-1.417-.186-2.101H12.24Z"
      />
      <path
        fill="#4285F4"
        d="M12 22c2.79 0 5.131-.923 6.842-2.508l-3.349-2.6c-.923.62-2.102.99-3.493.99-2.685 0-4.961-1.814-5.776-4.248l-3.454 2.666C4.471 19.672 7.964 22 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.224 13.634a5.99 5.99 0 0 1-.323-1.919c0-.67.116-1.317.323-1.918L2.77 7.13A10.004 10.004 0 0 0 2 11.715c0 1.611.386 3.137 1.07 4.584l3.154-2.665Z"
      />
      <path
        fill="#34A853"
        d="M12 5.55c1.518 0 2.875.522 3.941 1.55l2.959-2.959C17.126 2.494 14.785 1.43 12 1.43c-4.036 0-7.529 2.328-9.23 5.7l3.454 2.667C7.039 7.364 9.315 5.55 12 5.55Z"
      />
    </svg>
  );
}

export function AuthGooglePlaceholder({
  buttonLabel,
  helperText
}: AuthGooglePlaceholderProps) {
  return (
    <section className="auth-social-box" aria-label="Lựa chọn Google">
      <button type="button" className="auth-google-button" disabled>
        <span className="auth-google-icon">
          <GoogleMark />
        </span>
        <span className="auth-google-label">{buttonLabel}</span>
        <span className="auth-google-status">Sắp mở</span>
      </button>

      <p className="auth-social-note">{helperText}</p>

      <div className="auth-social-divider" aria-hidden="true">
        <span>Hoặc tiếp tục với email</span>
      </div>
    </section>
  );
}
