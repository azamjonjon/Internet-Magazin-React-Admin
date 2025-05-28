import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const API = "https://store-api.softclub.tj"

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
  },
  reducers: {},
  extraReducers: () => {
  },
});
export default counterSlice.reducer;
