import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { variables } from '../variables';
const initialState = {
    loading: false,
    error: false,
    bookRowIndex: "",
    bookingClient: {
        BookingID: 0,
        NationalID: "",
        NationalIdImagePath: "",
        SecondaryPhone: "",
        Address: "",
        ReservationAmount: 0,
        PaymentMethod: "-1",
        CheckImagePath: ""
    },
    bookingClients: [],
    nationalidImage: "",
    checkImage: "",
    savedData: "",
    InstallmentInformation: { TotalAmount: 0, DownPayment: 0, FirstInstallmentDate: "", InstallmentYears: "-1" },
    InstallmentDetails:[],
    paymentModal:false,
    paymentType:{PaymentType:"",CheckImage:""},
    installmentCheckImageName:"",
    paid:0,
    installmentRow:{}
}
//*********************************************************************** */
export const FillClientData = createAsyncThunk("FillClientData/booking", async (Clientdata) => {
    const resp = await axios.post(variables.URL_API_B + "GetBookingClientData", Clientdata)
        .then((res) => res.data);
    return resp;
})
export const saveNationalidImage = createAsyncThunk("saveNationalidImage/booking", async (formData) => {
    const resp = await axios.post(variables.URL_API_B + "SaveNationalID_Images", formData)
        .then((res) => res.data);
    return resp;
})
export const saveChecksImages = createAsyncThunk("saveChecksImages/booking", async (formData_) => {
    const resp = await axios.post(variables.URL_API_B + "SaveChecks_Images", formData_)
        .then((res) => res.data);
    return resp;
})
export const savebookingClient = createAsyncThunk("savebookingClient/booking", async (parms) => {
    const resp = await axios.post(variables.URL_API_B + "SaveBookingClient", parms)
        .then((res) => res.data);
    return resp;
})
export const generateInstallments = createAsyncThunk("generateInstallments/booking", async (request) => {
    const resp = await axios.post(variables.URL_API_B + "GenerateInstallments", request)
        .then((res) => res.data);
    return resp;
})
export const saveinstallmentCheck = createAsyncThunk("saveinstallmentCheck/booking", async (formData) => {
    const resp = await axios.post(variables.URL_API_B + "SaveInstallmentChecks_Images", formData)
        .then((res) => res.data);
    return resp;
})
const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        GetClientDataForbooking: (state, action) => {
            state.bookingClient = { ...state.bookingClient, ...action.payload };
        },
        ChangevaluesOfBookingClient: (state, action) => {
            state.bookingClient = { ...state.bookingClient, ...action.payload };
        },
        clearInputs: (state) => {
            state.bookingClient = initialState.bookingClient;
            state.InstallmentInformation = initialState.InstallmentInformation;
            state.checkImage = "",
            state.nationalidImage = "";
        },
        caluclateDownPayment: (state, action) => {
            if (state.bookingClient.ReservationAmount > 0) {
                const negoiationPrice = action.payload;
                state.InstallmentInformation.TotalAmount = negoiationPrice;
                const downpaymentBeforeReservation = state.InstallmentInformation.TotalAmount - state.bookingClient.ReservationAmount;
                state.InstallmentInformation.DownPayment = downpaymentBeforeReservation * (25 / 100);
            }
        },
        getInstallmentData: (state, action) => {
            state.InstallmentInformation = { ...state.InstallmentInformation, ...action.payload };
            state.paid=0;
        },
        showPaymentModal:(state,action)=>
        {
            state.paymentModal=action.payload;
        },
        getPaymentModalvalues:(state,action)=>{
            state.paymentType={...state.paymentType,...action.payload}
        },
        changepaymentStatus:(state,action)=>{
            state.paid=1;
            state.paymentModal=false;
        },
        getInstallmentIndexRow:(state,action)=>{
            state.installmentRow=state.InstallmentDetails[action.payload];
        }
         

    },
    extraReducers: (builder) => {
        builder
            .addCase(FillClientData.pending, (state) => {
                state.loading = true;
            })
            .addCase(FillClientData.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingClients = action.payload;
            })
            .addCase(FillClientData.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            //-------------------------------------------------------------
            .addCase(saveNationalidImage.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveNationalidImage.fulfilled, (state, action) => {
                state.loading = false;
                state.nationalidImage = action.payload;
            })
            .addCase(saveNationalidImage.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            //-------------------------------------------------------------
            .addCase(saveChecksImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveChecksImages.fulfilled, (state, action) => {
                state.loading = false;
                state.checkImage = action.payload;
            })
            .addCase(saveChecksImages.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            //-------------------------------------------------------------
            .addCase(savebookingClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(savebookingClient.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingClient.BookingID = action.payload.id;
                state.savedData = action.payload.saved;
            })
            .addCase(savebookingClient.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
             //-------------------------------------------------------------
            .addCase(generateInstallments.pending, (state) => {
                state.loading = true;
            })
            .addCase(generateInstallments.fulfilled, (state, action) => {
                state.loading = false;
                state.InstallmentDetails = action.payload;

            })
            .addCase(generateInstallments.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
              //-------------------------------------------------------------
            .addCase(saveinstallmentCheck.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveinstallmentCheck.fulfilled, (state, action) => {
                state.loading = false;
                state.installmentCheckImageName = action.payload;

            })
            .addCase(saveinstallmentCheck.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })

    }
})
export const { GetClientDataForbooking, ChangevaluesOfBookingClient, clearInputs, caluclateDownPayment,
    getInstallmentData,showPaymentModal,getPaymentModalvalues,changepaymentStatus,getInstallmentIndexRow
} = bookingSlice.actions;
const bookingReducer = bookingSlice.reducer;
export default bookingReducer;