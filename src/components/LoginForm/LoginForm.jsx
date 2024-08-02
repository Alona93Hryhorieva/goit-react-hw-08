import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
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
    dispatch(logIn(values));
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters")
      .trim(),
    number: Yup.string()
      .required("Number is required")
      .matches(/^[\d-]+$/, "Number must contain only digits or hyphens")
      .min(3, "Number must be at least 3 characters")
      .max(12, "Number cannot exceed 12 characters"),
  });

  return (
    <div className={css.containerForm}>
      <h2 className={css.title}>Please enter your Login!</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.container}>
            <label htmlFor={emailId} className={css.label}>
              Email:
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
              Password:
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
            <button type="submit" className={css.btn}>
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
