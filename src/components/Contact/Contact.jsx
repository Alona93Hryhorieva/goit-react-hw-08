// import { FaPhoneAlt } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { openModal } from "../../redux/contacts/slice";
// import { editingContact } from "../../redux/contacts/operations";
// import css from "./Contact.module.css";

// export default function Contact({ contact }) {
//   const dispatch = useDispatch();

//   const handleOpenModal = () => {
//     dispatch(openModal(contact.id));
//   };

//   const handleEditing = () => {
//     dispatch(editingContact({ contactId, updatedData }));
//   };

//   return (
//     <>
//       <div>
//         <p className={css.text}>
//           <FaUser />
//           {contact.name}
//         </p>
//         <p className={css.text}>
//           <FaPhoneAlt /> {contact.number}
//         </p>
//       </div>
//       <div className={css.containerBtn}>
//         <button type="button" onClick={handleOpenModal}>
//           Delete
//         </button>
//         <button type="button" onClick={handleEditing}>
//           Editing
//         </button>
//       </div>
//     </>
//   );
// }

import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { openModal } from "../../redux/contacts/slice";
import { editingContact } from "../../redux/contacts/operations";
import css from "./Contact.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: contact.name,
    number: contact.number,
  });

  const handleOpenModal = () => {
    dispatch(openModal(contact.id));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditing = () => {
    dispatch(editingContact({ contactId: contact.id, updatedData }));
    setIsEditing(false);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div>
        <p className={css.text}>
          <FaUser />
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={updatedData.name}
              onChange={handleEditChange}
            />
          ) : (
            contact.name
          )}
        </p>
        <p className={css.text}>
          <FaPhoneAlt />
          {isEditing ? (
            <input
              type="text"
              name="number"
              value={updatedData.number}
              onChange={handleEditChange}
            />
          ) : (
            contact.number
          )}
        </p>
      </div>
      <div className={css.containerBtn}>
        <button type="button" onClick={handleOpenModal}>
          Delete
        </button>
        {isEditing ? (
          <>
            <button type="button" onClick={handleEditing}>
              Save
            </button>
            <button type="button" onClick={toggleEditing}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={toggleEditing}>
            Edit
          </button>
        )}
      </div>
    </>
  );
}
