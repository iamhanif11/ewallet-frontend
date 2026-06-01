import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";


export const findReceivers = createAsyncThunk(
    "transaction/findReceivers",
    async ({ search = "", page = 1, limit = 10}, {rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token");

            const response = await api.get("/transaction/receivers", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    search: search,
                    page: page,
                    limit: limit
                }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
);

export const transferFunds = createAsyncThunk(
    "transaction/transferFunds",
    async (transferData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post("/transaction/transfer", transferData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
);

export const fetchTransactionHistory = createAsyncThunk(
    "transaction/fetchHistory",
    async ({ search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            
            const response = await api.get("/transaction/history", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    search: search, 
                    page: page,
                    limit: limit
                }
            });
            
            return response.data.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const transactionSlice = createSlice({
    name: "transaction",
    initialState:{
        receivers: [],
        pagination: {
            page: 1,
            limit: 10
        },
        status: "none",
        transferStatus: "none",
        error: null
    }, 
    reducers: {
        clearReceivers: (state) => {
            state.receivers = []
            state.status = "none"
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(findReceivers.pending, (state) => {
            state.status = "loading"
            state.error = null;
        })
        .addCase(findReceivers.fulfilled, (state, action) =>{
            state.status ="completed"
            state.receivers = action.payload.items || [];
            state.pagination = action.payload.pages || { page: 1, limit: 10}
        })
        .addCase(findReceivers.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.payload
        })

        .addCase(transferFunds.pending, (state) => {
            state.transferStatus = "loading"
            state.error = null
        })
        .addCase(transferFunds.fulfilled, (state) => {
            state.transferStatus = "completed"
        })
        .addCase(transferFunds.rejected, (state, action) => {
            state.transferStatus = "failed"
            state.error = action.payload
        })

        .addCase(fetchTransactionHistory.pending, (state) => {
            state.historyStatus = "loading"
            state.error = null
        })
        .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
            state.historyStatus = "completed"
            state.histories = action.payload.items || action.payload || []
        })
        .addCase(fetchTransactionHistory.rejected, (state, action) =>{
            state.historyStatus ="failed"
            state.error = action.payload
        })
    }
})

export const {clearReceivers} = transactionSlice.actions;
export default transactionSlice.reducer;