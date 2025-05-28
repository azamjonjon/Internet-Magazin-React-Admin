import { lazy } from "react";

export const Dashboard = lazy(()=>import("../pages/Dashboard/dashboard"))
export const Login = lazy(()=>import("../pages/login/login"))
export const Layout = lazy(()=>import("../pages/layout/layout"))
export const Orders = lazy(()=>import("../pages/Orders/orders"))
export const Others = lazy(()=>import("../pages/Other/other"))
export const Products = lazy(()=>import("../pages/Products/products"))
