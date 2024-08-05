import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { openModal } from "../../redux/contacts/slice";
import { editingContact } from "../../redux/contacts/operations";
import css from "./Contact.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.contacts.loading);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: contact.name,
    number: contact.number,
  });

  useEffect(() => {
    setUpdatedData({
      name: contact.name,
      number: contact.number,
    });
  }, [contact]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

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
