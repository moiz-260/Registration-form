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
  className = "",
}: FormCheckboxProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className={`flex items-center gap-3 
        0  border-none text-lg font-medium text-slate-700
        cursor-pointer w-fit ${className}`}
      >
        <input
          type="checkbox"
          {...register(name)}
          className="h-5 w-5 rounded-md border-gray-400 text-blue-600 cursor-pointer
          focus:ring-blue-500"
        />
        <span className="text-sm">{label}</span>
      </label>

      {error && <p className="text-sm text-red-500 ml-1">{error.message}</p>}
    </div>
  );
}
