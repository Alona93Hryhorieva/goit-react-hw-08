import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "../ContactList/ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import { selectFilterName } from "../../redux/filtersSlice";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const filter = useSelector(selectFilterName) || "";

  // const filteredContacts = items.filter((item) => {
  //   if (typeof item.name === "string") {
  //     return item.name.toLowerCase().includes(filter.toLowerCase());
  //   }
  //   return false;
  // });

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
