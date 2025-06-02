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
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditProductFun, getById, getColor } from "../../reducers/adminStore";
import { get } from "../../reducers/subCategory";
import { getBrand } from "../../reducers/brand";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const subCategory = useSelector((state) => state.subcategory.subcategory);
  const color = useSelector((state) => state.counter.color);
  const brand = useSelector((state) => state.barnd.data);
  const dataById = useSelector((state) => state.counter.dataById);
  console.log(dataById);
  console.log(color);

  const [editName, seteditName] = useState(null);
  const [editCode, seteditCode] = useState(null);
  const [editDescription, seteditDescription] = useState(null);
  const [editQuantity, seteditQuntity] = useState(null);
  const [editPrice, seteditPrice] = useState(null);
  const [editDiscount, seteditDiscount] = useState(null);
  const [editBrand, seteditBrand] = useState(null);
  const [editColor, seteditColor] = useState(null);
  const [editCategory, seteditCategory] = useState(null);
  const [editId, seteditId] = useState(null);

  useEffect(() => {
    dispatch(get());
    dispatch(getColor());
    dispatch(getBrand());
    dispatch(getById(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (dataById) {
      seteditName(dataById.productName || "");
      seteditCode(dataById.code || "");
      seteditDescription(dataById.description || "");
      seteditQuntity(dataById.quantity);
      seteditPrice(dataById.price || "");
      seteditBrand(dataById.brandId || "");
      seteditCategory(dataById.subCategoryId || "");
      seteditDiscount(false);
      seteditId(dataById.id)
      {color.find((el)=>{
        if(el.colorName==dataById.color){
            seteditColor(el.id)
        }
      })}
    }
  }, [dataById]);

  function EditFun() {
    let editObj = {
        Id:editId,
        BrandId:editBrand,
        ColorId:editColor,
        ProductName:editName,
        Description:editDescription,
        Quantity:editQuantity,
        Code:editCode,
        Price:editPrice,
        HasDiscount:editDiscount,
        SubCategoryId:editCategory
    }
    dispatch(EditProductFun(editObj))
  }

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h5">Products / Add new</Typography>
        <Stack direction="row" spacing={2}>
          <Link to="/products">
            <Button variant="outlined">Cancel</Button>
          </Link>
          <Button variant="contained" onClick={()=>EditFun()}>Save</Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography fontWeight={600} gutterBottom>
              Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  value={editName}
                  onChange={(e) => seteditName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  value={editCode}
                  onChange={(e) => seteditCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={editDescription}
                  onChange={(e) => seteditDescription(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Categories</InputLabel>
                  <Select value={editCategory} onChange={(e)=>seteditCategory(e.target.value)}>
                    {subCategory.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.subCategoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Brands</InputLabel>
                  <Select value={editBrand} onChange={(e)=>seteditBrand(e.target.value)}>
                    {brand.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.brandName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography fontWeight={600} gutterBottom>
              Price
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  value={editPrice}
                  onChange={(e) => seteditPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={editDiscount}
                  onChange={(e) => seteditDiscount(e.target.value)}
                  fullWidth
                />  
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={editQuantity}
                  onChange={(e) => seteditQuntity(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography fontWeight={600}>Colour</Typography>
            <Grid container spacing={1} mt={1}>
              {color.map((c) => (
                <div style={{backgroundColor:`${c.colorName}`, width:50, height:50, borderRadius:50}}>
                </div>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProduct;
