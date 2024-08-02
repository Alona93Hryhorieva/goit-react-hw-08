import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { closeModal } from "../../redux/contacts/slice.js";
import { deleteContact } from "../../redux/contacts/operations";
import css from "./ModalDeleteContact.module.css";

export default function ModalDeleteContact() {
  const dispatch = useDispatch();
  const { state, contactId } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(deleteContact(contactId));
    dispatch(closeModal());
    toast.success("Successfully deleted!");
  };
  return (
    <>
      <div open={state} onClose={handleClose} className={css.wrapper}>
        <button className={css.closeBtn} onClick={handleClose}>
          <RxCross2 />
        </button>
        <h2 className={css.title}>Are you sure about that?</h2>
        <Button className={css.btn} onClick={handleClose}>
          Cancel
        </Button>
        <Button className={css.btn} onClick={handleConfirm}>
          Delete
        </Button>
      </div>
    </>
  );
}
