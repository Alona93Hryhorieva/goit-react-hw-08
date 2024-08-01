import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://66a61b1423b29e17a1a1bef9.mockapi.io";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const responce = await axios.get("/contacts");
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const responce = await axios.post("/contacts", contact);
      toast.success("The contact was successfully added!");
      return responce.data;
    } catch (error) {
      toast.error("Failed to add contact. Please try again!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const responce = await axios.delete(`/contacts/${contactId}`);
      toast.success("The contact was successfully deleted!");
      return responce.data;
    } catch (error) {
      toast.error("Failed to delete contact. Please try again!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editingContact = createAsyncThunk(
  "contacts/editingContact",
  async ({ contactId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${contactId}`, updatedData);
      toast.success("The contact was successfully changed!");
      return response.data;
    } catch (error) {
      toast.error("Failed to change contact. Please try again!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
