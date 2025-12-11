import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "@/validations/formSchema";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FormInput } from "@/components/Form/FormInput";
import { FormSelect } from "@/components/Form/FormSelect";
import { FormCheckbox } from "@/components/Form/FormCheckbox";
import type { FormData } from "@/types/form.type";
import "@/components/Form/RegistrationForm.css";

const defaultFormValues: FormData = {
  fullName: "",
  email: "",
  phone: "",
  age: 0,
  dateofbirth: "",
  gender: "",
  country: "",
  city: "",
  address: "",
  password: "",
  confirmPassword: "",
  termsAccepted: undefined,
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema) as any,
    mode: "onChange",
  });

  // Use localStorage with useState
  const [savedFormData, setSavedFormData, clearFormData] =
    useLocalStorage<FormData>({
      key: "formData",
      initialValue: defaultFormValues,
    });

  // Load saved data on mount
  useEffect(() => {
    if (savedFormData && Object.keys(savedFormData).length > 0) {
      reset(savedFormData);
    }
  }, []);

  // Save form data on change
  useEffect(() => {
    const subscription = watch((value) => {
      setSavedFormData(value as FormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setSavedFormData]);

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
    clearFormData(); // Clear storage after successful submission
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1>Details</h1>

        <FormInput
          name="fullName"
          register={register}
          error={errors.fullName}
          placeholder="Full Name"
        />

        <FormInput
          name="email"
          register={register}
          error={errors.email}
          placeholder="Email"
        />

        <FormInput
          name="phone"
          register={register}
          error={errors.phone}
          placeholder="Phone"
        />

        <FormInput
          name="dateofbirth"
          register={register}
          error={errors.dateofbirth}
          type="date"
        />

        <FormInput
          name="age"
          register={register}
          error={errors.age}
          placeholder="Age"
          type="number"
        />

        <FormSelect
          name="gender"
          register={register}
          error={errors.gender}
          options={genderOptions}
          placeholder="Select gender"
        />

        <FormInput
          name="country"
          register={register}
          error={errors.country}
          placeholder="Country"
        />

        <FormInput
          name="city"
          register={register}
          error={errors.city}
          placeholder="City"
        />

        <FormInput
          name="address"
          register={register}
          error={errors.address}
          placeholder="Address"
        />

        <FormInput
          name="password"
          register={register}
          error={errors.password}
          placeholder="Password"
          type="password"
        />

        <FormInput
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
          placeholder="Confirm Password"
          type="password"
        />

        <FormCheckbox
          name="termsAccepted"
          register={register}
          error={errors.termsAccepted}
          label="I accept the terms and conditions"
        />

        <button className="submit-btn" type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}
