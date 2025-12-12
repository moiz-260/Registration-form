import { useEffect, useState } from "react";
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
  const [showSuccess, setShowSuccess] = useState(false);

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

  const [savedFormData, setSavedFormData, clearFormData] =
    useLocalStorage<FormData>({
      key: "formData",
      initialValue: defaultFormValues,
    });

  useEffect(() => {
    if (savedFormData && Object.keys(savedFormData).length > 0) {
      reset(savedFormData);
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value) => {
      setSavedFormData(value as FormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setSavedFormData]);

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
    setShowSuccess(true);
    clearFormData();
    reset(defaultFormValues);
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <>
      <div className="modern-form-wrapper">
        <div className="modern-form-card">
          <h1 className="modern-form-title">Registration Form</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modern-section-header">
              <span className="modern-section-badge">1</span>
              Personal Information
            </div>

            <div className="modern-form-grid">
              <div className="modern-input-wrapper">
                <FormInput
                  name="fullName"
                  register={register}
                  error={errors.fullName}
                  placeholder="Full Name"
                  className="modern-input"
                />
              </div>

              <div className="modern-input-wrapper">
                <FormInput
                  name="email"
                  register={register}
                  error={errors.email}
                  placeholder="Email"
                  className="modern-input"
                />
              </div>

              <div className="modern-input-wrapper">
                <FormInput
                  name="phone"
                  register={register}
                  error={errors.phone}
                  placeholder="Phone"
                  className="modern-input"
                />
              </div>

              <div className="modern-input-wrapper">
                <FormInput
                  name="dateofbirth"
                  register={register}
                  error={errors.dateofbirth}
                  type="date"
                  className="modern-input"
                  placeholder="DateOfBirth"
                />
              </div>

              <div className="modern-input-wrapper">
                <FormInput
                  name="age"
                  register={register}
                  error={errors.age}
                  placeholder="Age"
                  type="number"
                  className="modern-input"
                />
              </div>

              <div className="modern-input-wrapper">
                <FormSelect
                  name="gender"
                  register={register}
                  error={errors.gender}
                  options={genderOptions}
                  placeholder="Select gender"
                  className="modern-select"
                />
              </div>
            </div>

            {/* Location Section */}
            <div className="modern-section-header">
              <span className="modern-section-badge">2</span>
              Location Details
            </div>

            <div className="modern-form-grid">
              <div className="modern-input-wrapper">
                <FormInput
                  name="country"
                  register={register}
                  error={errors.country}
                  placeholder="Country"
                  className="modern-input"
                />
              </div>

              <div className="modern-input-wrapper">
                <FormInput
                  name="city"
                  register={register}
                  error={errors.city}
                  placeholder="City"
                  className="modern-input"
                />
              </div>
            </div>

            <div className="modern-form-grid full-width">
              <div className="modern-input-wrapper">
                <FormInput
                  name="address"
                  register={register}
                  error={errors.address}
                  placeholder="Address"
                  className="modern-input"
                />
              </div>
            </div>

            {/* Security Section */}
            <div className="modern-section-header">
              <span className="modern-section-badge">3</span>
              Security
            </div>

            <div className="modern-form-grid">
              <div className="modern-input-wrapper">
                <FormInput
                  name="password"
                  register={register}
                  error={errors.password}
                  placeholder="Password"
                  type="password"
                  className="modern-input"
                />
              </div>

              <div className="modern-input-wrapper">
                <FormInput
                  name="confirmPassword"
                  register={register}
                  error={errors.confirmPassword}
                  placeholder="Confirm Password"
                  type="password"
                  className="modern-input"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="modern-terms">
              <FormCheckbox
                name="termsAccepted"
                register={register}
                error={errors.termsAccepted}
                label="I accept the terms and conditions"
                className="modern-checkbox"
              />
            </div>

            <button
              className="modern-submit-btn"
              type="submit"
              disabled={!isValid}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>

      {/* Success Message Modal */}
      {showSuccess && (
        <>
          <div className="success-overlay" onClick={closeSuccessMessage}></div>
          <div className="success-message">
            <div className="success-icon">
              <svg viewBox="0 0 52 52">
                <path className="success-checkmark" d="M14 27l8 8 16-16" />
              </svg>
            </div>
            <h2 className="success-title">Registration Successful!</h2>
            <p className="success-description">
              Your account has been created successfully. Welcome aboard!
            </p>
            <button className="success-close-btn" onClick={closeSuccessMessage}>
              Got it!
            </button>
          </div>
        </>
      )}
    </>
  );
}
