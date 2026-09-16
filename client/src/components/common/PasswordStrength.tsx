interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  if (!password) return null;

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  const strength = score <= 2 ? "Weak" : score <= 4 ? "Medium" : "Strong";

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Password Strength</span>

        <span
          className={
            strength === "Strong"
              ? "text-green-600"
              : strength === "Medium"
                ? "text-yellow-600"
                : "text-red-600"
          }
        >
          {strength}
        </span>
      </div>

      <div className="h-2 rounded-full overflow-hidden bg-slate-200">
        <div
          className={`h-full transition-all ${
            score <= 2
              ? "w-1/3 bg-red-500"
              : score <= 4
                ? "w-2/3 bg-yellow-500"
                : "w-full bg-green-500"
          }`}
        />
      </div>

      <ul className="space-y-1 text-xs text-slate-600">
        <li>{checks.length ? "✅" : "❌"} At least 8 characters</li>
        <li>{checks.uppercase ? "✅" : "❌"} Uppercase letter</li>
        <li>{checks.lowercase ? "✅" : "❌"} Lowercase letter</li>
        <li>{checks.number ? "✅" : "❌"} Number</li>
        <li>{checks.special ? "✅" : "❌"} Special character</li>
      </ul>
    </div>
  );
};
