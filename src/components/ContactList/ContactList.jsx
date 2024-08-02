import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "../ContactList/ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contacts/slice.js";
import { selectFilterName } from "../../redux/filters/selectors.js";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const filter = useSelector(selectFilterName) || "";

  return (
    <ul className={css.list}>
      {filteredContacts.map((item) => (
        <li key={item.id} className={css.item}>
          <Contact contactFrend={item} />
        </li>
      ))}
      {filteredContacts.length === 0 && filter && (
        <p className={css.error}>No matches found. Check the name</p>
      )}
    </ul>
  );
}
