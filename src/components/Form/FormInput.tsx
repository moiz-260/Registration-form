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
  return (
    <>
      <input
        className={className}
        placeholder={placeholder}
        type={type}
        {...register(name)}
      />
      {error && <p className="error">{error.message}</p>}
    </>
  );
}
