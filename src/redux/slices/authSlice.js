import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/register", userData);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }    
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth", credentials);

            console.log("Respon golang:", response.data)
            const userData = response.data.data
            const token = userData.token
            if (token) {
                localStorage.setItem("token", token);
                console.log("Token sukses!")
            } else {
                console.log("Tidak ditemukan")
            }
            return userData;
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");
            if (token){
                await api.delete("/auth/logout", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            localStorage.removeItem("token")
            return true 
        } catch (error) {
            localStorage.removeItem("token")

            if (error.response?.status === 401){
                return true
            }
            return rejectWithValue(error.response?.data)
        }
    }
);

export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (emailData, {rejectWithValue}) => {
        try{
            const response = await api.post("/auth/forgot-password/verify-email", emailData);
            return response.data;
        } catch (error){
            return rejectWithValue(error.response?.data);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (resetData, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/forgot-password/reset", resetData)
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data)
        }
    }
);

export const createPin = createAsyncThunk(
    "auth/createPin",
    async (pinData, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.patch("/user/pin", pinData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error){
            return rejectWithValue(error.response?.data)
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        currentUser: null,
        status: "none", 
        error: null
    },
    reducers: {
       clearAuthError: (state) => {
        state.error = null;
        state.status = "none";
       }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.status = "completed";
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload
        })
        .addCase(loginUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = "completed"
            state.isLoggedIn = true;
            state.currentUser = action.payload.user || action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })

        .addCase(logoutUser.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.currentUser = null;
            state.status = "none"
        })
        .addCase(logoutUser.rejected, (state) => {
            state.isLoggedIn=false;
            state.currentUser=null;
            state.status="none"
        })

        .addCase(createPin.fulfilled, (state, action) => {
            state.status = "completed";
            if (state.currentUser) {
                state.currentUser.pin = action.meta.arg.pin
                state.currentUser.has_pin = true
            }
        })
        .addCase(createPin.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })

    }
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;