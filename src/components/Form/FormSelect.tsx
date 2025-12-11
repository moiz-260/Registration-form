import type { UseFormRegister, FieldError } from "react-hook-form";
import type { FormData } from "@/types/form.type";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  error?: FieldError;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function FormSelect({
  name,
  register,
  error,
  options,
  placeholder = "Select an option",
  className = "form-select",
}: FormSelectProps) {
  return (
    <>
      <select className={className} {...register(name)}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="error">{error.message}</p>}
    </>
  );
}
