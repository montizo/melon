"use client";

import Input from "@/components/Input";
import signupAction, {
  checkEmailNotTaken,
  checkUsernameNotTaken,
} from "@/app/(auth)/signup/actions";
import { emailSchema, passwordSchema, usernameShema } from "@/lib/validation";
import Form from "@/components/Form";
import { useEffect, useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    if (
      usernameShema.safeParse(username).success === true &&
      emailSchema.safeParse(email).success === true &&
      passwordSchema.safeParse(password).success === true
    ) {
      setHasErrors(false);
    } else {
      setHasErrors(true);
      return;
    }

    (async () => {
      const usernameTaken = await checkUsernameNotTaken(username);
      const emailTaken = await checkEmailNotTaken(email);

      if (usernameTaken || emailTaken) {
        setHasErrors(true);
        return;
      }
    })();
  }, [username, email, password]);

  return (
    <Form
      formAction={signupAction}
      title="Welcome to App"
      subTitle="Create a new account"
      buttonText="Signup"
      buttonDisabled={hasErrors}
      buttonStyles="bg-[#822929] border-[#9f3a3a]"
      footer={{
        text: "Have an account?",
        linkText: "Login",
        linkTo: "/login",
      }}
    >
      <Input
        label="Username"
        type="text"
        name="username"
        validation={usernameShema}
        checkExists={checkUsernameNotTaken}
        setExternalUseState={(value) => setUsername(value)}
      />
      <Input
        label="Email"
        type="text"
        name="email"
        placeholder="you@domain.xyz"
        validation={emailSchema}
        checkExists={checkEmailNotTaken}
        setExternalUseState={(value) => setEmail(value)}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="●●●●●●"
        validation={passwordSchema}
        setExternalUseState={(value) => setPassword(value)}
      />
    </Form>
  );
}
