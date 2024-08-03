import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import { useId } from "react";
import css from "./RegistrationForm.module.css";
import toast from "react-hot-toast";

export default function RegistrationForm() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters")
      .trim(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password cannot exceed 50 characters"),
  });

  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    // console.log("Form values:", values); // Логування значень форми перед відправленням
    dispatch(register(values))
      .then((result) => {
        toast.log("Registration successful!");
      })
      .catch((error) => {
        toast.error("Registration failed with error:", error); // Логування помилки при невдачі
      });
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Fill in the fields for registration</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form} autoComplete="off">
          <div>
            <label htmlFor={nameId} className={css.label}>
              Name:
            </label>
            <Field
              type="text"
              name="name"
              id={nameId}
              className={css.input}
              placeholder="Tom Hardy"
            />
            <ErrorMessage className={css.error} component="span" name="name" />
          </div>
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
            <button type="submit">Register</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
