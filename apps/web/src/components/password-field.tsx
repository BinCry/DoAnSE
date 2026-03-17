"use client";

import { useState, type InputHTMLAttributes } from "react";

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

function PasswordVisibilityIcon({ isVisible }: { isVisible: boolean }) {
  if (isVisible) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="auth-password-icon"
        aria-hidden="true"
      >
        <path d="M3 3l18 18" />
        <path d="M10.6 6.7A10.8 10.8 0 0 1 12 6c6.5 0 10 6 10 6a18.8 18.8 0 0 1-4.1 4.4" />
        <path d="M6 6.2A18.3 18.3 0 0 0 2 12s3.5 6 10 6c1.5 0 2.8-.3 4-.8" />
        <path d="M9.9 9.9A3 3 0 0 0 12 15a3 3 0 0 0 2.1-.9" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="auth-password-icon"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function PasswordField({ label, ...inputProps }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const actionLabel = isVisible ? `Ẩn ${label.toLowerCase()}` : `Hiện ${label.toLowerCase()}`;

  return (
    <label className="field auth-field auth-password-field">
      <span>{label}</span>
      <div className="auth-password-input-wrap">
        <input {...inputProps} type={isVisible ? "text" : "password"} />
        <button
          type="button"
          className="auth-password-toggle"
          aria-label={actionLabel}
          aria-pressed={isVisible}
          title={actionLabel}
          onClick={() => setIsVisible((currentValue) => !currentValue)}
        >
          <PasswordVisibilityIcon isVisible={isVisible} />
        </button>
      </div>
    </label>
  );
}
