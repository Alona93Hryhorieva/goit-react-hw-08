import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/contacts/slice.js";
import { setSelectedContact } from "../../redux/contacts/slice";
import css from "./Contact.module.css";

export default function Contact({ contactFrend: { id, name, number } }) {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal(id));
  };

  const handleChange = () => {
    dispatch(setSelectedContact(contactFrend));
  };

  return (
    <>
      <div>
        <p className={css.text}>
          <FaPhoneAlt /> {name}
        </p>
        <p className={css.text}>
          <FaUser />
          {number}
        </p>
      </div>
      <div className={css.Btn}>
        <button className={css.btn} type="button" onClick={handleOpenModal}>
          Delete
        </button>
        <button className={css.btn} type="button" onClick={handleChange}>
          Change
        </button>
      </div>
    </>
  );
}
