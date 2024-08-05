// import { useSelector } from "react-redux";
// import Contact from "../Contact/Contact";
// import css from "../ContactList/ContactList.module.css";
// import { selectFilteredContacts } from "../../redux/contacts/selectors";
// import {
//   selectFilterName,
//   selectFilterNumber,
// } from "../../redux/filters/selectors";

// export default function ContactList() {
//   const filteredContacts = useSelector(selectFilteredContacts);
//   const filterName = useSelector(selectFilterName) || "";
//   const filterNumber = useSelector(selectFilterNumber) || "";

//   return (
//     <>
//       <ul className={css.list}>
//         {filteredContacts.map((contact) => (
//           <li key={contact.id} className={css.item}>
//             <Contact contact={contact} />
//           </li>
//         ))}
//         {filteredContacts.length === 0 && (filterName || filterNumber) && (
//           <p className={css.error}>
//             No matches found. Check the name or number.
//           </p>
//         )}
//       </ul>
//     </>
//   );
// }

import React from "react";
import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "../ContactList/ContactList.module.css";
import {
  selectFilteredContacts,
  selectLoading,
  selectError,
} from "../../redux/contacts/selectors";
import {
  selectFilterName,
  selectFilterNumber,
} from "../../redux/filters/selectors";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const filterName = useSelector(selectFilterName) || "";
  const filterNumber = useSelector(selectFilterNumber) || "";
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul className={css.list}>
      {filteredContacts.length > 0
        ? filteredContacts.map((contact) => (
            <li key={contact.id} className={css.item}>
              <Contact contact={contact} />
            </li>
          ))
        : (filterName || filterNumber) && (
            <p className={css.error}>
              No matches found. Check the name or number.
            </p>
          )}
    </ul>
  );
}
