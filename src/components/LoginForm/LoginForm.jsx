import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";

import css from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();

  const emailId = useId();
  const passwordId = useId();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    // console.log("Submitting values:", values); // Логування даних перед відправкою
    dispatch(login(values)).catch((error) => {
      // console.error("Error during login:", error); // Логування помилок
    });
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Невірний формат електронної пошти")
      .required("Електронна пошта є обов'язковою"),
    password: Yup.string()
      .required("Пароль є обов'язковим")
      .min(6, "Пароль має бути не менше 6 символів"),
  });

  return (
    <div className={css.container}>
      <h2 className={css.title}>Enter your login details</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <div>
            <label htmlFor={emailId} className={css.label}>
              Email:
            </label>
            <Field
              type="email"
              name="email"
              id={emailId}
              className={css.input}
              placeholder="TomHardy@gmail.com"
            />
            <ErrorMessage className={css.error} component="span" name="email" />
          </div>
          <div>
            <label htmlFor={passwordId} className={css.label}>
              Password:
            </label>
            <Field
              type="password"
              name="password"
              id={passwordId}
              className={css.input}
            />
            <ErrorMessage
              className={css.error}
              component="span"
              name="password"
            />
          </div>
          <div className={css.containerBtn}>
            <button type="submit">Sign in</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
