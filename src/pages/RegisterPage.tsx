import React from "react";
import RegistrationForm from "../components/RegistrationForm";

const RegisterPage: React.FC = () => {
  return (
    <div className="container min-h-screen mx-auto p-4 space-y-10 pt-20">
      <RegistrationForm />
    </div>
  )
}

export default RegisterPage;