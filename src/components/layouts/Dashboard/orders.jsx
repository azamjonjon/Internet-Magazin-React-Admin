import { extendTheme, Paper, Typography, Box } from "@mui/material";
import { AppProvider, DashboardLayout, PageContainer } from "@toolpad/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { DataGrid } from "@mui/x-data-grid";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "status",
    headerName: "Payment status",
    sortable: false,
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, status: "Paid" },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    status: "Paid",
  },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45, status: "Paid" },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16, status: "Paid" },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
    status: "Paid",
  },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150, status: "Paid" },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    status: "Paid",
  },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36, status: "Paid" },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65, status: "Paid" },
  {
    id: 10,
    lastName: "Shervon",
    firstName: "Shervinov",
    age: 14,
    status: "Pending",
  },
  {
    id: 11,
    lastName: "Azam",
    firstName: "Zafarzoda",
    age: 16,
    status: "Pending",
  },
  {
    id: 12,
    lastName: "Jaborov",
    firstName: "Safar",
    age: 40,
    status: "Pending",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

function useDemoRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate,
  };
}

const Orders = () => {
  const router = useDemoRouter("/orders");
  const demoWindow = typeof window !== "undefined" ? window : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <Box sx={{ maxWidth: "1200px", margin: "0 auto", p: 2 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Orders
            </Typography>

            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                height: 500,
                mt: 2,
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
              />
            </Paper>
          </Box>

          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Orders;
