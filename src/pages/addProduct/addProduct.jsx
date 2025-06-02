import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Stack,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getColor } from "../../reducers/adminStore";
import { get } from "../../reducers/subCategory";
import { getBrand } from "../../reducers/brand";
import DeleteIcon from "@mui/icons-material/Delete";

const AddProducts = () => {
  const dispatch = useDispatch();
  const subCategory = useSelector((state) => state.subcategory.subcategory);
  const color = useSelector((state) => state.counter.color);
  const brand = useSelector((state) => state.barnd.data);

  const [addName, setAddName] = useState("");
  const [addImage, setAddImage] = useState([]);
  const [addDescription, setAddDescription] = useState("");
  const [addQuantity, setAddQuntity] = useState("");
  const [addCode, setAddCode] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [addDiscount, setAddDiscount] = useState("");
  const [addBrand, setAddBrand] = useState("");
  const [addColor, setAddColor] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [hasTax, setHasTax] = useState(false);
  const [hasOptions, setHasOptions] = useState(true);
  const [tags, setTags] = useState(["T-Shirt", "Men Clothes", "Summer Collection"]);
  const [tagInput, setTagInput] = useState("");
  const [options, setOptions] = useState([
    { name: "Size", values: ["S", "M", "L", "XL"] },
    { name: "Weight", values: ["10", "20", "30", "40"] },
  ]);

  useEffect(() => {
    dispatch(get());
    dispatch(getColor());
    dispatch(getBrand());
  }, [dispatch]);

  const handleFileChange = (e) => {
    setAddImage([...addImage, ...e.target.files]);
  };



  const AddFun = () => {
    const formData = new FormData();
    formData.append("ProductName", addName);
    addImage.forEach((file) => formData.append("Images", file));
    formData.append("BrandId", addBrand);
    formData.append("ColorId", addColor);
    formData.append("Description", addDescription);
    formData.append("Quantity", addQuantity);
    formData.append("Code", addCode);
    formData.append("Price", addPrice);
    formData.append("HasDiscount", false);
    formData.append("SubCategoryId", addCategory);
    dispatch(addProduct(formData));
  };

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h5">Products / Add new</Typography>
        <Stack direction="row" spacing={2}>
          <Link to="/products">
            <Button variant="outlined">Cancel</Button>
          </Link>
          <Button variant="contained" onClick={AddFun}>
            Save
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography fontWeight={600} gutterBottom>Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField label="Product name" fullWidth value={addName} onChange={(e) => setAddName(e.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Code" fullWidth value={addCode} onChange={(e) => setAddCode(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Description" multiline rows={4} fullWidth value={addDescription} onChange={(e) => setAddDescription(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Categories</InputLabel>
                  <Select value={addCategory} onChange={(e) => setAddCategory(e.target.value)}>
                    {subCategory.map((e) => <MenuItem key={e.id} value={e.id}>{e.subCategoryName}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Brands</InputLabel>
                  <Select value={addBrand} onChange={(e) => setAddBrand(e.target.value)}>
                    {brand.map((e) => <MenuItem key={e.id} value={e.id}>{e.brandName}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography fontWeight={600} gutterBottom>Price</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}><TextField label="Product price" fullWidth value={addPrice} onChange={(e) => setAddPrice(e.target.value)} /></Grid>
              <Grid item xs={4}><TextField label="Discount" fullWidth value={addDiscount} onChange={(e) => setAddDiscount(e.target.value)} /></Grid>
              <Grid item xs={4}><TextField label="Count" fullWidth value={addQuantity} onChange={(e) => setAddQuntity(e.target.value)} /></Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Switch checked={hasTax} onChange={(e) => setHasTax(e.target.checked)} />} label="Add tax for this product" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography fontWeight={600}>Colour</Typography>
            <Grid container spacing={1} mt={1}>
              {color.map((c) => (
                <Grid item key={c.id}>
                  <Button
                    variant={addColor === c.id ? "contained" : "outlined"}
                    sx={{ borderRadius: "50%", minWidth: 40, minHeight: 40, bgcolor: c.colorName }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>


          <Paper sx={{ p: 3 }}>
            <Typography fontWeight={600}>Images</Typography>
            <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
              Click to upload or drag and drop
              <input type="file" multiple hidden onChange={handleFileChange} />
            </Button>
            <Divider sx={{ my: 2 }} />
            {addImage.map((file, index) => (
              <Stack key={index} direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2">{file.name}</Typography>
                <IconButton onClick={() => {
                  const updated = [...addImage];
                  updated.splice(index, 1);
                  setAddImage(updated);
                }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProducts;
