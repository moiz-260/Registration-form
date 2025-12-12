import { useState } from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";
import type { FormData } from "@/types/form.type";

interface FormInputProps {
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  error?: FieldError;
  placeholder?: string;
  type?: string;
  className?: string;
}

export function FormInput({
  name,
  register,
  error,
  placeholder,
  type = "text",
  className = "form-input",
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField =
    type === "password" || name === "password" || name === "confirmPassword";

  const actualType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="relative w-full">
      {/* ✅ FIXED HEIGHT WRAPPER FOR INPUT + ICON */}
      <div className="relative h-[60px] flex items-center">
        <input
          id={name}
          className={`${className} ${isPasswordField ? "pr-10" : ""} h-full`}
          placeholder=" "
          type={actualType}
          {...register(name)}
        />

        {placeholder && (
          <label
            htmlFor={name}
            className="absolute left-4 top-0 -translate-y-1/2 border-none
              text-sm font-medium text-slate-500 transition-all duration-200 pointer-events-none
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400
              peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:font-semibold"
            style={{ zIndex: 1 }}
          >
            {placeholder}
          </label>
        )}

        {/* 👁 Password Eye Icon — locked to input height */}
        {isPasswordField && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 hover:text-blue-500 transition"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3l18 18M10.7 10.7a3 3 0 014.6 4.6"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
                />
                <circle cx="12" cy="12" r="3" strokeWidth="2" />
              </svg>
            )}
          </span>
        )}
      </div>

      {/* ❗ ERROR PLACED OUTSIDE — no layout shift */}
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}
