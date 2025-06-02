import {
  extendTheme,
  Paper,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { AppProvider, DashboardLayout, PageContainer } from "@toolpad/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API, get } from "../../../reducers/adminStore";
import { DataGrid } from "@mui/x-data-grid";
import { LineChart } from "@mui/x-charts/LineChart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import img1 from "../../../pages/images/iconly-glass-chart.svg.png";
import img2 from "../../../pages/images/iconly-glass-discount.svg fill.png";
import img3 from "../../../pages/images/div.MuiBox-root.png";
import img4 from "../../../pages/images/Group 1000004658.png";

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
});

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    width: 160,
    sortable: false,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
];

const rows2 = [
  { name: "Frozen yoghurt", calories: 159, fat: 6, carbs: 24, protein: 4 },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
  },
  { name: "Eclair", calories: 262, fat: 16, carbs: 24, protein: 6 },
  { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: "Gingerbread", calories: 356, fat: 16, carbs: 49, protein: 3.9 },
];

function useDemoRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate,
  };
}

const InfoCard = ({ icon, label, value, bgColor }) => (
  <Card
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      p: 2,
      backgroundColor: bgColor,
    }}
  >
    <img src={icon} alt="" style={{ width: 40 }} />
    <Box>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  </Card>
);

const Dashbord = () => {
  const router = useDemoRouter("/dashboard");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.counter.data);
  useEffect(() => {
    dispatch(get());
  }, [dispatch]);

  const demoWindow = typeof window !== "undefined" ? window : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{

        logo: <img src={img4}/>,
        title:"Fastcart"
      }
      }
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <InfoCard
                icon={img1}
                label="Sales"
                value="$152k"
                bgColor="#FEF3F2"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoCard
                icon={img2}
                label="Cost"
                value="$99.7k"
                bgColor="#FFFAEB"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoCard
                icon={img3}
                label="Profit"
                value="$32.1k"
                bgColor="#F0FDF9"
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Sales Revenue
                </Typography>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                  height={300}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Top selling products
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {Array.isArray(data) && data.length > 0 ? (
                    data.map((elem) => (
                      <Box
                        key={elem.id}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box display="flex" alignItems="center" gap={2}>
                          <img
                            src={`${API}/images/${elem.image}`}
                            alt={elem.productName}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 8,
                              objectFit: "cover",
                            }}
                          />
                          <Box>
                            <Typography>{elem.productName}</Typography>
                            <Typography color="textSecondary" variant="caption">
                              in Accessories
                            </Typography>
                          </Box>
                        </Box>
                        <Typography color="success.main" fontWeight="bold">
                          ${elem.price}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography color="textSecondary">
                      No top-selling products found.
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ height: 350 }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  sx={{ border: 0 }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ height: 350 }}>
                <TableContainer component={Box}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dessert</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat (g)</TableCell>
                        <TableCell align="right">Carbs (g)</TableCell>
                        <TableCell align="right">Protein (g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows2.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashbord;
