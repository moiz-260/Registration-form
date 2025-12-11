import * as yup from "yup";

export const formSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required").min(11,"Min 11 numbers"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .min(1, "Age must be at least 1")
    .required("Age is required"),
  dateofbirth: yup.string().required("Date of Birth is required"),
  gender: yup.string().required("Gender required"),
  country: yup.string().required("Country required"),
  city: yup.string().required("City required"),
  address: yup.string().required("Address required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain upper, lower, number & special character"
    )
    .required("Password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password required"),
  // In your formSchema
  termsAccepted: yup
    .boolean()
    .required("You must accept the terms")
    .oneOf([true], "You must accept the terms"),
});

export type FormSchema = yup.InferType<typeof formSchema>;
