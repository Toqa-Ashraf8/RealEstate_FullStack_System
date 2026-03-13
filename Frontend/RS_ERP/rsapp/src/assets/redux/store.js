import { configureStore } from '@reduxjs/toolkit';
import projReducer from './projectSlice';
import clientReducer from './clientSlice';
import negotiationReducer from './negotiationSlice';
export const store = configureStore({
    reducer: {
        projects: projReducer,
        clients: clientReducer,
        negotiation:negotiationReducer
    }
})