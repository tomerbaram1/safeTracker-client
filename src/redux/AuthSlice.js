import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "./AuthService";

// get user from localStorage
const user = JSON.stringify(AsyncStorage.getItem("user"));
const child = JSON.stringify(AsyncStorage.getItem("child"));

const initialState = {
  user: user ? user : null,
  child: child ? child : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(


  "http://172.20.10.4:4000/api/register",
 
  async (user, thunkAPI) => {
    try {

      return await AuthService.register(user);

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
);

// login user


export const login = createAsyncThunk("http://172.20.10.4:4000/api/login", async (user, thunkAPI) => {
  
  try {
  
    return (AuthService.login(user)) 
  } catch (error) {

    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
      console.log("error ",error);
    return thunkAPI.rejectWithValue(message);
  }
});




export const loginChild = createAsyncThunk("http://172.20.10.4:4000/api/childAuth", async (child, thunkAPI) => {
  
  try {
    
    return (AuthService.loginChild(child)) 
    
  } catch (error) {

    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
      console.log("error ",error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginChild.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginChild.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.child = action.payload;
      })
      .addCase(loginChild.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.child = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;

      })

  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
