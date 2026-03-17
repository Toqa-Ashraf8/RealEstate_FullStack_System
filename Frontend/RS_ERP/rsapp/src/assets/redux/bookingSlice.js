import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { variables } from '../variables';
const initialState={
    loading:false,
    error:false,
    bookRowIndex:"",
    bookingClient:{},
    bookingClients:[]
}
//*********************************************************************** */
export const FillClientData=createAsyncThunk("FillClientData/booking",async(Clientdata)=>{
    const resp=axios.post(variables.URL_API_B+"GetBookingClientData",Clientdata)
    .then((res)=>res.data);
    return resp;
})


const bookingSlice=createSlice({
name:'booking',
initialState,
reducers:{
     GetClientDataForbooking:(state,action)=>{
        state.bookingClient={...state.bookingClient,...action.payload};
    }
},
extraReducers:(builder)=>{
    builder
    .addCase(FillClientData.pending,(state)=>{
        state.loading=true;
    })
     .addCase(FillClientData.fulfilled,(state,action)=>{
        state.loading=false;
        state.bookingClients=action.payload;
    })
    .addCase(FillClientData.rejected,(state)=>{
        state.loading=false;
        state.error=true;
    })
   
}
})
export const {GetClientDataForbooking}=bookingSlice.actions;
const bookingReducer=bookingSlice.reducer;
export default bookingReducer;