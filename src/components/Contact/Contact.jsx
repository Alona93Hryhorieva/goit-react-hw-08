import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openModal, setSelectedContact } from "../../redux/contacts/slice";
import css from "./Contact.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal(contact.id));
  };

  const handleEditing = () => {
    dispatch(setSelectedContact(contact));
  };

  return (
    <>
      <div>
        <p className={css.text}>
          <FaUser />
          {contact.name}
        </p>
        <p className={css.text}>
          <FaPhoneAlt /> {contact.number}
        </p>
      </div>
      <div className={css.containerBtn}>
        <button type="button" onClick={handleOpenModal}>
          Delete
        </button>
        <button type="button" onClick={handleEditing}>
          Editing
        </button>
      </div>
    </>
  );
}
