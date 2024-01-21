"use client";

import { Dictionary } from "@/dictionaries/Dictionary";
import { Button, Input } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { getRegisterUserSchema } from "./getRegisterUserSchema";

export default function RegisterForm({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  const schema = getRegisterUserSchema(dictionary);
  type RegisterUser = z.infer<typeof schema>;

  async function onSubmit(registerUser: RegisterUser) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerUser),
    });
    if (response.status === 201) {
      const { username, password } = registerUser;
      await signIn("credentials", { username, password });
    }
  }

  return (
    <Formik<RegisterUser>
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(schema)}
    >
      {({ handleChange, handleBlur, values, errors, isSubmitting }) => (
        <Form className="flex flex-col gap-2">
          <Input
            label={dictionary.auth.login.username}
            name="username"
            isRequired
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            isInvalid={!!errors.username}
            errorMessage={errors.username}
          />
          <Input
            label={dictionary.auth.register.email}
            name="email"
            type="email"
            isRequired
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            isInvalid={!!errors.email}
            errorMessage={errors.email}
          />
          <Input
            label={dictionary.auth.login.password}
            name="password"
            type="password"
            isRequired
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            isInvalid={!!errors.password}
            errorMessage={errors.password}
          />
          <Input
            label={dictionary.auth.login.confirmPassword}
            name="confirmPassword"
            type="password"
            isRequired
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword}
          />
          <Button color="primary" type="submit" isDisabled={isSubmitting}>
            {dictionary.auth.register.submit}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
