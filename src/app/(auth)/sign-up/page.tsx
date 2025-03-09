"use client";

import FooterLink from "../../../components/forms/FooterLink";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import SubmitButton from "../../../components/forms/SubmitButton";
import useValidation from "../_useValidation";
import { validationSchema } from "./_validationSchema";
import signupAction from "./actions";

export default function SignupPage() {
  const { values, errors, handleChange, isValid, pendingField } =
    useValidation(validationSchema);

  return (
    <Form
      formAction={signupAction}
      title="Welcome to app"
      subtitle="Create a new account"
    >
      <Input
        label="Username"
        type="text"
        name="username"
        placeholder="Enter your username"
        value={values.username}
        onChange={handleChange}
        error={errors.username}
      />
      <Input
        label="Email"
        type="text"
        name="email"
        placeholder="Enter your email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SubmitButton disabled={!isValid}>Sign Up</SubmitButton>
      <FooterLink
        text="Have an account?"
        link={{ text: "Login", link: "/login" }}
      />
    </Form>
  );
}
