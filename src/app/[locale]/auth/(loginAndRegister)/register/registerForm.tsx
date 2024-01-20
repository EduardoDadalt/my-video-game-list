"use client";

import { Dictionary } from "@/dictionaries/Dictionary";
import { Button, Input } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerUser as registerUserAction } from "./actions";
import { getRegisterUserSchema } from "./getRegisterUserSchema";
import Alert from "@/components/alert";
import { signIn } from "next-auth/react";

export default function RegisterForm({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  const [state, formAction] = useFormState(registerUserAction, { message: "" });
  const schema = getRegisterUserSchema(dictionary);
  type RegisterUser = z.infer<typeof schema>;
  return (
    <Formik<RegisterUser>
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={async (values) => {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("confirmPassword", values.confirmPassword);
        formAction(formData);
        const { username, password } = values;
        await signIn("credentials", { username, password });
      }}
      validationSchema={toFormikValidationSchema(schema)}
    >
      {({ handleChange, handleBlur, values, errors, isSubmitting }) => (
        <Form className="flex flex-col gap-2" action={formAction}>
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
            {dictionary.auth.login.submit}
          </Button>
          {!!state && <Alert type="error">{state.message}</Alert>}
        </Form>
      )}
    </Formik>
  );
}
