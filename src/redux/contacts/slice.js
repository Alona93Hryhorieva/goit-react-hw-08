import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editingContact,
} from "./operations";
import { logout } from "../auth/operations";

const initialState = {
  name: "contacts",
  items: [],
  loading: false,
  error: null,
  selectedContact: null,
  modal: { isOpen: false, contactId: "66ae27f9c495ed6e25f3175e" },
};

// const updateContactInState = (state, action) => {
//   state.loading = false;
//   const index = state.items.findIndex(
//     (contact) => contact.id === action.payload.id
//   );
//   if (index !== -1) {
//     state.items[index] = action.payload;
//   }
// };

const removeContactFromState = (state, action) => {
  console.log("removeContactFromState called", action.payload);
  state.loading = false;
  state.modal.isOpen = false;
  state.modal.contactId = null;

  const index = state.items.findIndex(
    (contact) => contact.id === action.payload.id
  );
  if (index !== -1) {
    state.items.splice(index, 1);
    console.log("Contact removed", state.items);
  } else {
    console.log("Contact not found");
  }
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    openModal: (state, action) => {
      state.modal.isOpen = true;
      state.modal.contactId = action.payload;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.contactId = null;
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
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editingContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editingContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        // .addCase(editingContact.fulfilled, (state, action) => {
        //   const index = state.findIndex(
        //     (contact) => contact.id === action.payload.id
        //   );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      // .addCase(editingContact.fulfilled, updateContactInState)
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
