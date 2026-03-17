import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
const initialState={
    loading:false,
    error:false,
    bookRowIndex:"",
}
const bookingSlice=createSlice({
name:'booking',
initialState,
reducers:{
    GetClientDataForbooking:(state,action)=>{
        state.bookRowIndex=action.payload;
    }
}

})
export const {GetClientDataForbooking}=bookingSlice.actions;
const bookingReducer=bookingSlice.reducer;
export default bookingReducer;