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
    <div className="relative">
      <select id={name} className={className} {...register(name)}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className="absolute left-4 top-0 -translate-y-1/2 border-none
             text-sm font-medium text-slate-500 transition-all duration-200 pointer-events-none
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400
            peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:font-semibold"
        style={{
          zIndex: 1,
        }}
      >
        {placeholder}
      </label>
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}
