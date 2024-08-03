
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
    console.log("Submitting values:", values); // Логування даних перед відправкою
    dispatch(login(values)).catch((error) => {
      console.error("Error during login:", error); // Логування помилок
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
    <div className={css.containerForm}>
      <h2 className={css.title}>Будь ласка, увійдіть до системи!</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.container}>
            <label htmlFor={emailId} className={css.label}>
              Електронна пошта:
            </label>
            <Field
              type="email"
              className={css.input}
              id={emailId}
              name="email"
            />
            <ErrorMessage className={css.error} component="span" name="email" />
          </div>
          <div className={css.container}>
            <label htmlFor={passwordId} className={css.label}>
              Пароль:
            </label>
            <Field
              type="password"
              className={css.input}
              id={passwordId}
              name="password"
            />
            <ErrorMessage
              className={css.error}
              component="span"
              name="password"
            />
          </div>
          <div className={css.containerBtn}>
            <button type="submit" >
              Увійти
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
