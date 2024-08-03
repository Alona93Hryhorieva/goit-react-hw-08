import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editingContact,
} from "./operations";
import { logout } from "../auth/operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedContact: null,
  modal: { state: false, contactId: null },
};

const updateContactInState = (state, action) => {
  state.loading = false;
  const index = state.items.findIndex(
    (contact) => contact.id === action.payload.id
  );
  if (index !== -1) {
    state.items[index] = action.payload;
  }
};

const removeContactFromState = (state, action) => {
  state.loading = false;
  const index = state.items.findIndex(
    (contact) => contact.id === action.payload.id
  );
  if (index !== -1) {
    state.items.splice(index, 1);
  }
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.contacts.selectedContact = action.payload;
    },
    openModal: (state, action) => {
      state.contacts.modal.state = true;
      state.contacts.modal.contactId = action.payload;
    },
    closeModal: (state) => {
      state.contacts.modal.state = false;
      state.contacts.modal.contactId = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, removeContactFromState)
      .addCase(editingContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editingContact.fulfilled, updateContactInState)
      .addCase(editingContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.loading = false;
      });
  },
});

export const { setSelectedContact, openModal, closeModal } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
