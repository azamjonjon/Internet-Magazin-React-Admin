import { extendTheme } from "@mui/material";
import { AppProvider, DashboardLayout, PageContainer } from "@toolpad/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import img1 from "../../../pages/images/iconly-glass-chart.svg.png";
import img2 from "../../../pages/images/iconly-glass-discount.svg fill.png";
import img3 from "../../../pages/images/div.MuiBox-root.png";
import { LineChartPro } from "@mui/x-charts-pro/LineChartPro";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const initialZoomData = [
  {
    axisId: "my-x-axis",
    start: 20,
    end: 40,
  },
];
const NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "dashboard", title: "Dasboard", icon: <DashboardIcon /> },
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
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate,
  };
}

const Dashbord = () => {
  const router = useDemoRouter("/dashboard");

  const demoWindow = typeof window !== "undefined" ? window : undefined;
  const apiRef = React.useRef(undefined);
  const [zoomData, setZoomData] = React.useState(initialZoomData);
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <div className="">
            <div className="">
              <div className="w-[60%]">
                <div className="flex justify-around">
                  <div className="flex gap-[10px] bg-[#FEF3F2] w-[200px] p-[20px]">
                    <img src={img1} alt="" />
                    <div className="">
                      <p className="text-gray-500">Sales</p>
                      <p className="text-[25px]">$152k</p>
                    </div>
                  </div>
                  <div className="flex gap-[10px] bg-[#FFFAEB] w-[200px] p-[20px]">
                    <img src={img2} alt="" />
                    <div className="">
                      <p className="text-gray-500">Cost</p>
                      <p className="text-[25px]">$99.7k</p>
                    </div>
                  </div>
                  <div className="flex gap-[10px] bg-[#F0FDF9] w-[200px] p-[20px]">
                    <img src={img3} alt="" />
                    <div className="">
                      <p className="text-gray-500">Profit</p>
                      <p className="text-[25px]">$32.1k</p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <Stack sx={{ width: "100%", justifyContent: "flex-start" }}>
                    <LineChartPro
                      {...chartProps}
                      initialZoom={initialZoomData}
                      apiRef={apiRef}
                      onZoomChange={setZoomData}
                      xAxis={[
                        {
                          zoom: true,
                          scaleType: "point",
                          id: "my-x-axis",
                          data: randomData.map((v, i) => i),
                        },
                      ]}
                    />
                    <pre>{JSON.stringify(zoomData, null, 2)}</pre>
                    <div>
                      <Button
                        variant="contained"
                        onClick={() =>
                          apiRef.current.setZoomData([
                            { axisId: "my-x-axis", start: 0, end: 100 },
                          ])
                        }
                      >
                        Reset zoom
                      </Button>
                    </div>
                  </Stack>
                </div>
              </div>
              <div className=""></div>
            </div>
            <div className=""></div>
          </div>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashbord;
