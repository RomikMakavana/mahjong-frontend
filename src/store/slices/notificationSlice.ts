import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Notification } from "../../interfaces";

export interface NotificationState {
    details: Notification | null
}

const initialState: NotificationState = {
    details: null
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<Notification | null>) => {            
                state.details = action.payload
        }
    }
})

export const {setNotification} = notificationSlice.actions;
export default notificationSlice.reducer;