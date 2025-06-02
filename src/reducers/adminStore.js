import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const API = "https://store-api.softclub.tj";
const token = localStorage.getItem("token");
export const get = createAsyncThunk("get/data", async () => {
  try {
    const response = await axios.get(`${API}/Product/get-products`);
    return response.data.data.products;
  } catch (error) {
    console.error(error);
  }
});

export const delProduct = createAsyncThunk(
  "counter/delProduct",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${API}/Product/delete-product?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(get());
    } catch (error) {
      console.error(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "counter/addProduct",
  async (newProduct, { dispatch }) => {
    try {
      await axios.post(`${API}/Product/add-product`, newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(get());
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "counter/deleteProduct",
  async (id) => {
    try {
      await axios.delete(`${API}/Product/delete-product?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(get());
    } catch (error) {
      console.error(error);
    }
  }
);

export const getColor = createAsyncThunk("counter/getColor", async () => {
  try {
    let response = await axios.get(`${API}/Color/get-colors`, {
      headers: { Autorization: `Bearer${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
});

export const getById = createAsyncThunk("counter/getById", async (id) => {
  try {
    let response = await axios.get(
      `${API}/Product/get-product-by-id?id=${id}`,
      {
        headers: { Autorization: `Bearer${token}` },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
});

export const EditProductFun = createAsyncThunk(
  "counter/EditProduct",
  async (editProduct, { dispatch }) => {
    try {
      await axios.put(
        `${API}/Product/update-product?Id=${editProduct.Id}&BrandId=${editProduct.BrandId}&ColorId=${editProduct.ColorId}&ProductName=${editProduct.ProductName}&Description=${editProduct.Description}&Quantity=${editProduct.Quantity}&Code=${editProduct.Code}&Price=${editProduct.Price}&HasDiscount=${editProduct.HasDiscount}&SubCategoryId=${editProduct.SubCategoryId}`,
        {},
        { headers: { Autorization: `Bearer${token}` } }
      );
      dispatch(get());
    } catch (error) {
      console.error(error);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    data: [],
    color: [],
    dataById: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.color = action.payload;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.dataById = action.payload;
      });
  },
});
export default counterSlice.reducer;
