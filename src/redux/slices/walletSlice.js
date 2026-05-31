import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";


export const fetchWalletData = createAsyncThunk(
    "wallet/fetchData",
    async(_, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/user/wallet", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const fetchTransactionReport = createAsyncThunk(
    "wallet/fetchReport",
    async(_, { rejectWithValue }) => {
        try{
            const token = localStorage.getItem("token")
            const response = await api.get("/user/reports", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.data;
        }catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
);

const walletSlice = createSlice({
    name: "wallet", 
    initialState: {
        balance: 0,
        income: 0,
        expense: 0,
        reportData: [],
        status: "none",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWalletData.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(fetchWalletData.fulfilled, (state, action) =>{
                state.status = "completed",
                state.balance = action.payload.balance
                state.income = action.payload.income
                state.expense = action.payload.expense
            })
            .addCase(fetchWalletData.rejected, (state, action) =>{
                state.status = "failed"
                state.error = action.payload;
            })

            .addCase(fetchTransactionReport.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTransactionReport.fulfilled, (state, action) => {
                state.status = "completed"
                state.reportData = action.payload;
            })
            .addCase(fetchTransactionReport.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
    }
})

export default walletSlice.reducer