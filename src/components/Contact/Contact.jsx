import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import css from "./Contact.module.css";

export default function Contact({ contactFrend: { id, name, number } }) {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));

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
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
