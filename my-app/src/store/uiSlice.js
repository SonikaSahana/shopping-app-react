import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: null },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { status: null, title: "", message: "" },
  reducers: {
    showNotification: (state, action) => {
      state.status = action.payload.status;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    hideNotification: (state) => {
      state.status = null;
      state.title = "";
      state.message = "";
    }
  }
});



export const { showNotification } = uiSlice.actions;
export default uiSlice.reducer;
