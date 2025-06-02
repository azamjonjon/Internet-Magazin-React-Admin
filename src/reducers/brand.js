import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const API = "https://store-api.softclub.tj";
let token = localStorage.getItem("token");
export const getBrand = createAsyncThunk("brand/get", async () => {
  try {
    let response = await axios.get(`${API}/Brand/get-brands`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const AddBrand = createAsyncThunk(
  "barnd/AddBrand",
  async (brandName, { dispatch }) => {
    try {
      await axios.post(
        `${API}/Brand/add-brand?BrandName=${brandName}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(getBrand());
    } catch (error) {
      console.error(error);
    }
  }
);

export const EditBrand = createAsyncThunk(
  "brand/EditBrand",
  async (editBrand, { dispatch }) => {
    try {
      await axios.put(
        `${API}/Brand/update-brand?Id=${editBrand.id}&BrandName=${editBrand.BrandName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(getBrand());
    } catch (error) {
      console.error(error);
    }
  }
);


export const deleteBrand = createAsyncThunk("barnd/deleteBrand", async (id,{dispatch})=>{
  try {
    await axios.delete(`${API}/Brand/delete-brand?id=${id}`,{
      headers: { Authorization: `Bearer ${token}` }
    })
    dispatch(getBrand())
  } catch (error) {
    console.error(error);
  }
})

export const BrandStore = createSlice({
  name: "barnd",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrand.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
export default BrandStore.reducer;
