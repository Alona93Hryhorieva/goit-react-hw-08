import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      // console.log("Sending data to server:", newUser); // Логування даних, що надсилаються
      const response = await axios.post("users/signup", newUser);
      setAuthHeader(response.data.token);
      toast.success("Registration was successful");
      return response.data;
    } catch (error) {
      console.error(
        "Server response error:",
        error.response ? error.response.data : error.message
      ); // Логування детальної інформації про помилку
      toast.error("Registration failed. Please try again");
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
// export const register = createAsyncThunk(
//   "auth/register",
//   async (newUser, thunkAPI) => {
//     try {
//       const response = await axios.post("/users/signup", newUser);
//       setAuthHeader(response.data.token);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const login = createAsyncThunk("auth/login", async (creds, thunkAPI) => {
  try {
    const response = await axios.post("/users/login", creds);
    setAuthHeader(response.data.token);
    toast.success("Login was successful");
    return response.data;
  } catch (error) {
    toast.error("Failed to login! Try again.");
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const login = createAsyncThunk("auth/login", async (creds, thunkAPI) => {
//   try {
//     const response = await axios.post("/users/login", creds);
//     setAuthHeader(response.data.token);
//     toast.success("Login was successful");
//     return response.data;
//   } catch (error) {
//     toast.error("Failed to login! Try again.");
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    setAuthHeader("");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    setAuthHeader(reduxState.auth.token);

    try {
      const response = await axios.get("/users/me");
      return response.data;
    } catch (error) {
      toast.error("Failed to login! Try again.");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);
