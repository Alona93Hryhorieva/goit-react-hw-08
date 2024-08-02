import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import { useId } from "react";
import css from "./RegistrationForm.module.css";

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
    number: Yup.string()
      .required("Number is required")
      .matches(/^[\d-]+$/, "Number must contain only digits or hyphens")
      .min(3, "Number must be at least 3 characters")
      .max(12, "Number cannot exceed 12 characters"),
  });

  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
    toast.success("Successfully edited");
  };
  //   const handleSubmit = ({ name, email, password }, actions) => {
  //     dispatch(registerThunk({ name, email, password }));
  //     actions.resetForm(initialValues);
  //   };
  return (
    <div>
      <h2 className={css.title}>Please fill in all fields for registration!</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form} autoComplete="off">
          <div className={css.container}>
            <label htmlFor={nameId} className={css.label}>
              {" "}
              Name :
            </label>
            <Field type="text" name="name" id={nameId} />
            <ErrorMessage className={css.error} component="span" name="name" />
          </div>
          <div>
            <label htmlFor={emailId} className={css.label}>
              {" "}
              Email:
            </label>
            <Field type="email" name="email" id={emailId} />
            <ErrorMessage className={css.error} component="span" name="email" />
          </div>
          <div>
            <label htmlFor={passwordId} className={css.label}>
              Password :
            </label>
            <Field type="password" name="password" id={passwordId} />
            <ErrorMessage
              className={css.error}
              component="span"
              name="password"
            />
          </div>
          <button type="submit" className={css.btn}>
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
