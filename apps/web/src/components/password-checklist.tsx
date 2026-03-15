"use client";

import { getPasswordChecklist } from "@/lib/password-policy";

interface PasswordChecklistProps {
  password: string;
  blockedFragments?: string[];
  confirmPassword?: string;
}

export function PasswordChecklist({
  password,
  blockedFragments = [],
  confirmPassword
}: PasswordChecklistProps) {
  const rules = getPasswordChecklist(password, blockedFragments);
  const showConfirmRule = typeof confirmPassword === "string";
  const isConfirmed =
    showConfirmRule &&
    confirmPassword.length > 0 &&
    confirmPassword === password;

  return (
    <div className="auth-note-card" aria-live="polite">
      <div className="auth-note-head">
        <h3>Tiêu chí mật khẩu an toàn</h3>
        <span className="pill">Áp dụng trước khi xác minh</span>
      </div>

      <ul className="password-rule-list">
        {rules.map((rule) => (
          <li
            key={rule.id}
            className={
              rule.passed ? "password-rule password-rule-passed" : "password-rule"
            }
          >
            <span className="password-rule-dot" aria-hidden="true" />
            <span>{rule.label}</span>
          </li>
        ))}

        {showConfirmRule ? (
          <li
            className={
              isConfirmed
                ? "password-rule password-rule-passed"
                : "password-rule"
            }
          >
            <span className="password-rule-dot" aria-hidden="true" />
            <span>Mật khẩu nhập lại phải trùng khớp.</span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
