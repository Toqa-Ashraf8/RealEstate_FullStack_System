import { configureStore } from '@reduxjs/toolkit';
import projReducer from './projectSlice';
import clientReducer from './clientSlice';
import negotiationReducer from './negotiationSlice';
import bookingReducer from './bookingSlice';
export const store = configureStore({
    reducer: {
        projects: projReducer,
        clients: clientReducer,
        negotiation:negotiationReducer,
        booking:bookingReducer
    }
})