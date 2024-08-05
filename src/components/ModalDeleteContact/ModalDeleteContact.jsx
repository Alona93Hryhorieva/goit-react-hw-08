import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { closeModal } from "../../redux/contacts/slice";
import { deleteContact } from "../../redux/contacts/operations";
import css from "./ModalDeleteContact.module.css";
import { selectModal } from "../../redux/contacts/selectors";

export default function ModalDeleteContact() {
  const dispatch = useDispatch();
  const { contactId } = useSelector(selectModal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(deleteContact(contactId));
    // toast.success("Successfully deleted!");
  };
  return (
    <>
      <div onClose={handleClose} className={css.container}>
        <button className={css.closeBtn} onClick={handleClose}>
          <RxCross2 />
        </button>
        <h2 className={css.title}>Are you sure about that?</h2>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleConfirm}>Delete</button>
      </div>
    </>
  );
}
