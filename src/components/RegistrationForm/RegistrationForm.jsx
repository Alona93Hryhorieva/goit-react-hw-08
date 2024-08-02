// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useDispatch } from "react-redux";
// import { register } from "../../redux/auth/operations";
// import * as Yup from "yup";
// import { useId } from "react";
// import toast from "react-hot-toast";
// import css from "./RegistrationForm.module.css";

// export default function RegistrationForm() {
//   const initialValues = {
//     name: "",
//     email: "",
//     password: "",
//   };

//   const nameId = useId();
//   const emailId = useId();
//   const passwordId = useId();

//   const validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .required("Name is required")
//       .min(3, "Name must be at least 3 characters")
//       .max(50, "Name cannot exceed 50 characters")
//       .trim(),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string()
//       .required("Password is required")
//       .min(6, "Password must be at least 6 characters")
//       .max(50, "Password cannot exceed 50 characters"),
//   });

//   const dispatch = useDispatch();
//   const handleSubmit = (values, actions) => {
//     console.log("Submitted values:", values); // Додайте цей рядок для перевірки даних
//     dispatch(register(values))
//       .then((result) => {
//         if (result.meta.requestStatus === "fulfilled") {
//           actions.resetForm();
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <h2 className={css.title}>Please fill in all fields for registration!</h2>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         validationSchema={validationSchema}
//       >
//         <Form className={css.form} autoComplete="off">
//           <div className={css.container}>
//             <label htmlFor={nameId} className={css.label}>
//               Name :
//             </label>
//             <Field type="text" name="name" id={nameId} />
//             <ErrorMessage className={css.error} component="span" name="name" />
//           </div>
//           <div>
//             <label htmlFor={emailId} className={css.label}>
//               Email:
//             </label>
//             <Field type="email" name="email" id={emailId} />
//             <ErrorMessage className={css.error} component="span" name="email" />
//           </div>
//           <div>
//             <label htmlFor={passwordId} className={css.label}>
//               Password :
//             </label>
//             <Field type="password" name="password" id={passwordId} />
//             <ErrorMessage
//               className={css.error}
//               component="span"
//               name="password"
//             />
//           </div>
//           <button type="submit" className={css.btn}>
//             Register
//           </button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import { useId } from "react";
import css from "./RegistrationForm.module.css";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

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
    console.log("Form values:", values); // Логування значень форми перед відправленням
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
              Name:
            </label>
            <Field type="text" name="name" id={nameId} />
            <ErrorMessage className={css.error} component="span" name="name" />
          </div>
          <div>
            <label htmlFor={emailId} className={css.label}>
              Email:
            </label>
            <Field type="email" name="email" id={emailId} />
            <ErrorMessage className={css.error} component="span" name="email" />
          </div>
          <div>
            <label htmlFor={passwordId} className={css.label}>
              Password:
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
