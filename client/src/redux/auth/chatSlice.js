import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setSeletedMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setSelectedUser, setSeletedMessages } = chatSlice.actions;
export default chatSlice.reducer;
