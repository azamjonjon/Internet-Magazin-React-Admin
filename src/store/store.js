import { configureStore } from "@reduxjs/toolkit";
import counterSlice  from "../reducers/adminStore";
import CategoryStore from "../reducers/categoty";
import BrandStore from "../reducers/brand";
import SubCategory from "../reducers/subCategory";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    category: CategoryStore,
    barnd: BrandStore,
    subcategory: SubCategory,
  },
});
