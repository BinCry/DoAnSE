export interface PasswordRuleResult {
  id: string;
  label: string;
  passed: boolean;
}

const commonUnsafeFragments = [
  "password",
  "123456",
  "123456789",
  "qwerty",
  "abc123",
  "matkhau",
  "vietnamairlines"
];

function normalizeFragments(blockedFragments: string[]) {
  return blockedFragments
    .flatMap((item) => item.toLowerCase().split(/[^a-z0-9]+/))
    .map((item) => item.trim())
    .filter((item) => item.length >= 3);
}

export function getPasswordChecklist(
  password: string,
  blockedFragments: string[] = []
): PasswordRuleResult[] {
  const normalizedPassword = password.toLowerCase();
  const sanitizedFragments = normalizeFragments(blockedFragments);
  const containsBlockedFragment = sanitizedFragments.some((fragment) =>
    normalizedPassword.includes(fragment)
  );
  const containsUnsafePattern = commonUnsafeFragments.some((fragment) =>
    normalizedPassword.includes(fragment)
  );

  return [
    {
      id: "length",
      label: "Tối thiểu 10 ký tự.",
      passed: password.length >= 10
    },
    {
      id: "uppercase",
      label: "Có ít nhất 1 chữ in hoa.",
      passed: /[A-Z]/.test(password)
    },
    {
      id: "lowercase",
      label: "Có ít nhất 1 chữ thường.",
      passed: /[a-z]/.test(password)
    },
    {
      id: "number",
      label: "Có ít nhất 1 chữ số.",
      passed: /\d/.test(password)
    },
    {
      id: "special",
      label: "Có ít nhất 1 ký tự đặc biệt.",
      passed: /[^A-Za-z0-9]/.test(password)
    },
    {
      id: "spaces",
      label: "Không chứa khoảng trắng.",
      passed: !/\s/.test(password)
    },
    {
      id: "common",
      label: "Không dùng chuỗi quá phổ biến hoặc quá dễ đoán.",
      passed: !containsUnsafePattern
    },
    {
      id: "personal-info",
      label: "Không chứa email, số điện thoại hoặc tên dễ đoán.",
      passed: !containsBlockedFragment
    }
  ];
}

export function isPasswordPolicySatisfied(
  password: string,
  blockedFragments: string[] = []
) {
  return getPasswordChecklist(password, blockedFragments).every(
    (rule) => rule.passed
  );
}
