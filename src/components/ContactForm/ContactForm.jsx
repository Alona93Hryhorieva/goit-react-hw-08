import { Field, Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useId } from "react";
import css from "./ContactForm.module.css";
import { addContact } from "../../redux/contacts/operations";
// import toast from "react-hot-toast";

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameId = useId();
  const numberId = useId();

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters")
      .trim(),
    number: yup
      .string()
      .required("Number is required")
      .matches(/^[\d-]+$/, "Number must contain only digits or hyphens")
      .min(3, "Number must be at least 3 characters")
      .max(12, "Number cannot exceed 12 characters"),
  });

  const handleSubmit = (values, action) => {
    action.resetForm();
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      })
    );
    // toast.success("Successfully created!");
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label htmlFor={nameId} className={css.label}>
            Name:
            <Field
              type="text"
              name="name"
              id={nameId}
              className={css.input}
              placeholder="Tom Hardy"
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </label>
          <label htmlFor={numberId} className={css.label}>
            Number:
            <Field
              type="tel"
              name="number"
              id={numberId}
              className={css.input}
              placeholder="1234567890"
            />
            <ErrorMessage
              name="number"
              component="span"
              className={css.error}
            />
          </label>
          <div className={css.containerBtn}>
            <button type="submit">Add contact</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
