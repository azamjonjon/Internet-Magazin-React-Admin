import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "../pages/loading/loading.jsx";
import { Dashboard, EditProduct, Layout, Login, Orders, Others, Products } from "../lazy/lazy.jsx";
import { store } from "../store/store.js";
import "./styles/global.css"
import AddProducts from "../pages/addProduct/addProduct.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Layout />
            </Suspense>
          }
        >
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="other" element={<Others />} />
          <Route path="products" element={<Products />} />
          <Route path="addProducts" element={<AddProducts />} />
          <Route path="editproduct/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
