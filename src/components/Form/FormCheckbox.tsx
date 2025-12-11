import type { UseFormRegister, FieldError } from "react-hook-form";
import type { FormData } from "@/types/form.type";

interface FormCheckboxProps {
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  error?: FieldError;
  label: string;
  className?: string;
}

export function FormCheckbox({
  name,
  register,
  error,
  label,
  className = "terms-row",
}: FormCheckboxProps) {
  return (
    <>
      <label className={className}>
        <input className="form-checkbox" type="checkbox" {...register(name)} />
        <span>{label}</span>
      </label>
      {error && <p className="error">{error.message}</p>}
    </>
  );
}
