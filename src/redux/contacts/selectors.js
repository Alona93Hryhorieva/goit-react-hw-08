import { createSelector } from "@reduxjs/toolkit";
import { selectFilterName } from "../filters/selectors";
import { selectFilterNumber } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectSelectedContact = (state) => state.contacts.selectedContact;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
export const selectModal = (state) => state.modal;
export const selectModalIsOpen = (state) => state.modal.isOpen;
export const selectModalContactId = (state) => state.modal.contactId;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilterName, selectFilterNumber],
  (contacts, filterName, filterNumber) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filterName.toLowerCase()) &&
        contact.number.includes(filterNumber)
    );
  }
);
