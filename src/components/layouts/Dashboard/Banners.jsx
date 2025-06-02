import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubCategory,
  deleteSubCategory,
  get,
} from "../../../reducers/subCategory";
import imgDelete from "../../../pages/images/Button with Icon Only (1).png";
import imgEdit from "../../../pages/images/Button with Icon Only.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "firstName", headerName: "Subcategory Name", width: 200 },
  {
    field: "Action",
    headerName: "Action",
    sortable: false,
    width: 120,
    renderCell: (params) => params.row.Action,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const Product = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subcategory.subcategory);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [editSubCategoryName, setEditSubCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    dispatch(get());
  }, []);

  const handleAddSubCategory = () => {
    const newSubCategory = {
      subCategoryName: name,
      CategoryId: categoryId,
    };
    dispatch(addSubCategory(newSubCategory));
    setName("");
    setCategoryId("");
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (elem) => {
    setOpen(true);
    setEditSubCategoryName(elem.subCategoryName)
    setEditCategoryId(elem.id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows = data.map((elem) => ({
    id: elem.id,
    firstName: elem.subCategoryName,
    Action: (
      <Box>
        <IconButton
          onClick={() => dispatch(deleteSubCategory(elem.id))}
          size="small"
        >
          <img src={imgDelete} alt="Delete" width={20} height={20} />
        </IconButton>
        <Button variant="outlined" onClick={()=>handleClickOpen(elem)}>
          <IconButton size="small">
            <img src={imgEdit} alt="Edit" width={20} height={20} />
          </IconButton>
        </Button>
      </Box>
    ),
  }));

  return (
    <div className="">
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Subcategory List
              </Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                autoHeight
                sx={{ border: "none", mt: 2 }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Add New Subcategory
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ mt: 2 }}
              >
                <TextField
                  fullWidth
                  label="Subcategory Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Category ID"
                  variant="outlined"
                  type="number"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAddSubCategory}
                  sx={{ mt: 2 }}
                >
                  Create
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <React.Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="EditName"
              variant="outlined"
              sx={{ mb: 2 }}
              value={editSubCategoryName}
              onChange={(e)=>setEditSubCategoryName(e.target.value)}
            />
            <TextField
              fullWidth
              label="EditCategoryId"
              variant="outlined"
              sx={{ mb: 2 }}
              value={editCategoryId}
              onChange={(e)=>setEditCategoryId(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Disagree
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Product;
