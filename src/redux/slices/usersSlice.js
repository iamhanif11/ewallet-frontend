import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchUserProfile = createAsyncThunk(
    "users/fetchProfile",
    async(_, { rejectWithValue }) => {
        try{
            const token = localStorage.getItem("token")

            const response = await api.get("/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "users/updateProfile",
    async (profileData, { rejectWithValue }) => {
        try{
            const token = localStorage.getItem("token");

            const response = await api.patch("/user/profile", profileData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data.data
        } catch (error){
            return rejectWithValue(error.response?.data)
        }
    }
);

export const updateUserPassword = createAsyncThunk(
    "users/updatePassword",
    async(passwordPayload, {rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token")

            const response = await api.patch("/user/password", passwordPayload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        profileData: null,
        status: "none",
        updateStatus: "none",
        error: null,
    },
    reducers: {
        clearUserError: (state) => {
            state.error = null;
            state.updateStatus = "none"
        }
    },
    extraReducers: (builder) => {
        builder

        .addCase(fetchUserProfile.pending, (state) => {
            state.status = "loading"
            state.error = null;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.status = "completed";
            state.profileData = action.payload;
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload;
        })

        .addCase(updateUserProfile.pending, (state) =>{
            state.updateStatus = "loading"
            state.error = null;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.updateStatus = "completed"
            state.profileData = action.payload
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.updateStatus = "failed"
            state.error = action.payload
        })

        .addCase(updateUserPassword.pending, (state) => {
            state.updateStatus = "loading";
            state.error = null;
        })
        .addCase(updateUserPassword.fulfilled, (state) => {
            state.updateStatus = "completed"
        })
        .addCase(updateUserPassword.rejected, (state, action) => {
            state.updateStatus = "failed"
            state.error = action.payload
        })
    }
});

export const { clearUserError } = usersSlice.actions;
export default usersSlice.reducer;


