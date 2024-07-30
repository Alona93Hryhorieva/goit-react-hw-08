import { Field, Formik, Form, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import css from "./ContactForm.module.css";
import { addContact } from "../../redux/contactsOps";

export default function ContactForm() {
  const nameFrendId = nanoid();
  const numberFrendId = nanoid();
  const dispatch = useDispatch();

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
    // event.preventDefault();
    action.resetForm();
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.container}>
        <label htmlFor={nameFrendId}>Name</label>
        <Field type="text" name="name" className={css.input} id={nameFrendId} />
        <ErrorMessage name="name" component="div" className={css.error} />

        <label htmlFor={numberFrendId}>Number</label>
        <Field
          type="tel"
          name="number"
          className={css.input}
          id={numberFrendId}
        />
        <ErrorMessage name="number" component="div" className={css.error} />
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
