"use server";

export default async function signupAction(_: any, formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log({ username, email, password });
}
