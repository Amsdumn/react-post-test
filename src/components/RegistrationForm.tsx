import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface RegistrationFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (data) => {
    console.log("Form Data:", data);
    alert("Registration Successful!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 dark:bg-slate-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">User Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1 dark:text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full border p-2 rounded dark:text-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1 dark:text-white">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full border p-2 rounded dark:text-white"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-semibold mb-1 dark:text-white">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="w-full border p-2 rounded dark:text-white"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="py-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
