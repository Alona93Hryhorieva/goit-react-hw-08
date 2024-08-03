import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import ModalDeleteContact from "../../components/ModalDeleteContact/ModalDeleteContact";
import {
  selectLoading,
  selectError,
  selectModal,
} from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const modal = useSelector(selectModal);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {modal.state && <ModalDeleteContact />}
      <div className={css.containerList}>
        <h2 className={css.title}>Phone book</h2>
        <div className={css.container}>
          <ContactForm />
          <SearchBox />
        </div>
        {error && <ErrorMessage />}
        {loading && <Loader />}
        {!error && !loading && <ContactList />}
      </div>
    </>
  );
}
