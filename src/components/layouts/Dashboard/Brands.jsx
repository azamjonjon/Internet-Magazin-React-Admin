import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddBrand,
  deleteBrand,
  EditBrand,
  getBrand,
} from "../../../reducers/brand";
import img6 from "../../../pages/images/Edit_2.png";
import img7 from "../../../pages/images/09 Delete.png";

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Brands = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.barnd.data);
  console.log(data);

  const [brandName, setBrandName] = useState("");
  const [editbrandName, setEditBrandName] = useState("");
  const [editId, setEditId] = useState(null);

  const [openView, setOpenView] = useState(false);
  const handleCloseAdd = () => setOpenAdd(false);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const handleAddBrand = () => {
    dispatch(AddBrand(brandName));
    setBrandName("");
  };

  const handleOpenView = (brand) => {
    setOpenView(true);
    setEditBrandName(brand.brandName);
    setEditId(brand.id);
  };
  const handleCloseView = () => {
    setOpenView(false);
  };

  function editBrandFun() {
    let editBrand = {
      BrandName: editbrandName,
      id: editId,
    };
    dispatch(EditBrand(editBrand));
  }

  return (
    <div>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Existing Brands
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {data.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No brands found.
                </Typography>
              ) : (
                data.map((elem) => (
                  <Box
                    key={elem.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      py: 1,
                      borderBottom: "1px solid #e0e0e0",
                      ":hover": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <Typography>{elem.brandName}</Typography>
                    <div className="">
                      <IconButton
                        sx={{
                          top: 0,
                          right: 10,
                          backgroundColor: "#fff",
                          borderRadius: "50%",
                          boxShadow: 2,
                          width: 32,
                          height: 32,
                          padding: 0,
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                          },
                        }}
                        onClick={() => handleOpenView(elem)}
                      >
                        <img src={img6} alt="edit" width={20} height={20} />
                      </IconButton>
                      <IconButton
                        sx={{
                          top: 0,
                          right: 10,
                          backgroundColor: "#fff",
                          borderRadius: "50%",
                          boxShadow: 2,
                          width: 32,
                          height: 32,
                          padding: 0,
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                          },
                        }}
                        onClick={() => dispatch(deleteBrand(elem.id))}
                      >
                        <img src={img7} alt="edit" width={20} height={20} />
                      </IconButton>
                    </div>
                  </Box>
                ))
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Add New Brand
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ mt: 2 }}
              >
                <TextField
                  fullWidth
                  label="Brand Name"
                  variant="outlined"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={handleAddBrand}
                >
                  Create
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openView} onClose={handleCloseView} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={() => editBrandFun()}>
          <DialogTitle fontWeight={600}>Edit Category</DialogTitle>
          <DialogContent dividers>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}
            >
              <TextField
                label="Category Name"
                variant="outlined"
                value={editbrandName}
                onChange={(e) => setEditBrandName(e.target.value)}
                fullWidth
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseView}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default Brands;
