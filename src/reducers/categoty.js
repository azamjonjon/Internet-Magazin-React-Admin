import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const API = "https://store-api.softclub.tj";
export const get = createAsyncThunk("category/get", async () => {
  try {
    const response = await axios.get(`${API}/Category/get-categories`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
});

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (form, { dispatch }) => {
    try {
      await axios.post(`${API}/Category/add-category`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(get());
    } catch (error) {
      console.error(error);
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async (editForm, { dispatch }) => {
    try {
      await axios.put(`${API}/Category/update-category`, editForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(get());
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${API}/Category/delete-category?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(get())
    } catch (error) {
      console.error(error);
    }
  }
);

export const CategoryStore = createSlice({
  name: "category",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
export default CategoryStore.reducer;
