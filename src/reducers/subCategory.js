import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const API = "https://store-api.softclub.tj";
let token = localStorage.getItem("token");
export const get = createAsyncThunk("category/get", async () => {
  try {
    const response = await axios.get(`${API}/SubCategory/get-sub-category`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
});

export const deleteSubCategory = createAsyncThunk(
  "subcategory/deleteSubCategory",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${API}/SubCategory/delete-sub-category?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(get());
    } catch (error) {
      console.error(error);
    }
  }
);

export const addSubCategory = createAsyncThunk(
  "subcategory/addSubCategory",
  async (newSubCategory, { dispatch }) => {
    try {
      await axios.post(
        `${API}/SubCategory/add-sub-category?CategoryId=${newSubCategory.CategoryId}&SubCategoryName=${newSubCategory.subCategoryName}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(get());
    } catch (error) {
      console.error(error);
    }
  }
);


export const editSubCategory = createAsyncThunk("subcategory/editSubCategory",async ()=>{
  try {
    await axios.put(`${API}`)
  } catch (error) {
    console.error(error);
  }
})



export const SubCategory = createSlice({
  name: "subcategory",
  initialState: {
    subcategory: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get.fulfilled, (state, action) => {
      state.subcategory = action.payload;
    });
  },
});
export default SubCategory.reducer;
