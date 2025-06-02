import {
  extendTheme,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Select,
  Paper,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { AppProvider, DashboardLayout, PageContainer } from "@toolpad/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  delProduct,
  get,
  getById,
  getColor,
} from "../../../reducers/adminStore";
import { get as getSubCategory } from "../../../reducers/subCategory";
import { API } from "../../../reducers/categoty";
import img4 from "../../../pages/images/Button with Icon Only (1).png";
import img5 from "../../../pages/images/Button with Icon Only.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getBrand } from "../../../reducers/brand";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "firstName",
    headerName: "First name",
    width: 200,
    renderCell: (params) => params.row.firstName,
  },
  { field: "quantity", headerName: "Quantity", width: 100 },
  { field: "category", headerName: "Category", width: 150 },
  { field: "Price", headerName: "Price", width: 120 },
  {
    field: "Action",
    headerName: "Action",
    sortable: false,
    width: 150,
    renderCell: (params) => params.row.Action,
  },
];

const NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "orders", title: "Orders", icon: <ShoppingCartIcon /> },
  { segment: "products", title: "Products", icon: <LayersIcon /> },
  { segment: "other", title: "Other", icon: <BarChartIcon /> },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get());
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();
  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate,
  };
}

const Product = () => {
  const router = useDemoRouter("/products");
  const data = useSelector((state) => state.counter.data);  
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getSubCategory());
    dispatch(getColor());
    dispatch(getBrand());
    dispatch(getById());
  }, []);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const rows = (data || []).map((elem) => ({
    id: elem.id,
    firstName: (
      <div className="flex items-center gap-2">
        <img
          className="w-[40px] h-[40px] object-cover rounded"
          src={`${API}/images/${elem.image}`}
          alt=""
        />
        <span>{elem.productName}</span>
      </div>
    ),
    quantity: elem.quantity ?? "N/A",
    category: elem.categoryName,
    Price: elem.price ?? "—",
    Action: (
      <div className="flex gap-2">
        <Button
          onClick={() => dispatch(delProduct(elem.id))}
          size="small"
          variant="outlined"
        >
          <img src={img4} alt="delete" className="w-5 h-5" />
        </Button>
        <Button variant="outlined">
          <img src={img5} onClick={() => {
            dispatch(getById(elem.id),
            navigate(`/editproduct/${elem.id}`)
          )   
          }} alt="edit" className="w-5 h-5" />
        </Button>
      </div>
    ),
  }));

  return (
    <div className="">
      <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
        <DashboardLayout>
          <PageContainer>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <Typography variant="h5" component="h1">
                  Product Management
                </Typography>
                <Link to="/addProducts">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 2 }}
                  >
                    Add New Product +
                  </Button>
                </Link>
              </div>

              <div className="flex justify-between items-center flex-wrap gap-4">
                <TextField
                  id="search"
                  label="Search Product"
                  variant="outlined"
                  size="small"
                  sx={{ width: "250px" }}
                />

                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="filter-label">Category</InputLabel>
                  <Select
                    labelId="filter-label"
                    id="filter"
                    value={filter}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="ten">Ten</MenuItem>
                    <MenuItem value="twenty">Twenty</MenuItem>
                    <MenuItem value="thirty">Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Paper elevation={3}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 5 } },
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  checkboxSelection
                  sx={{ border: 0, px: 2 }}
                />
              </Paper>
            </div>
            <Outlet />
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    </div>
  );
};

export default Product;
