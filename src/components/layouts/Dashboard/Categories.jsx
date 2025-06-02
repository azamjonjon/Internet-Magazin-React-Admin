import React, { useEffect, useState } from "react";
import img6 from "../../../pages/images/Edit_2.png";
import img7 from "../../../pages/images/09 Delete.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  editCategory,
  get,
} from "../../../reducers/categoty";
import { API } from "../../../reducers/adminStore";
import {
  Box,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Categories = () => {
  const data = useSelector((state) => state.category.data);
  const dispatch = useDispatch();

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [editCategoryName, seteditCategoryName] = useState("");
  const [editImage, setEditCategoryImage] = useState(null);
  const [idx, setIdx] = useState(null);
  const [image, setImage] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch(get());
  }, [dispatch]);

  const handleOpenAdd = () => {
    setCategoryName("");
    setImage(null);
    setOpenAdd(true);
  };
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenView = (category) => {
    setSelectedCategory(category);
    seteditCategoryName(category.categoryName);
    setIdx(category.id);
    setOpenView(true);
  };
  const handleCloseView = () => {
    setSelectedCategory(null);
    setOpenView(false);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!categoryName || !image) return alert("Please fill all fields");
    const form = new FormData();
    form.append("CategoryName", categoryName);
    form.append("CategoryImage", image);

    dispatch(addCategory(form));
    handleCloseAdd();
  };

  function editFun(e) {
    e.preventDefault();
    let editForm = new FormData();
    editForm.append("CategoryName", editCategoryName);
    editForm.append("CategoryImage", editImage);
    editForm.append("id", idx);
    dispatch(editCategory(editForm));
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Categories
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>
          + Add New Category
        </Button>
      </Box>

      <Grid container spacing={4}>
        {data.map((elem) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={elem.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                p: 2,
                position: "relative",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                },
                width: 250,
                height: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                image={`${API}/images/${elem.categoryImage}`}
                alt={elem.categoryName}
                sx={{
                  width: "100%",
                  height: 140,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                  cursor: "pointer",
                }}
                onClick={() => handleOpenView(elem)}
              />

              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="h6"
                  fontWeight={500}
                  sx={{ wordBreak: "break-word" }}
                >
                  {elem.categoryName}
                </Typography>
              </CardContent>

              <div className="">
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 10,
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
                <br />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 50,
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
                >
                  <img
                    onClick={() => dispatch(deleteCategory(elem.id))}
                    src={img7}
                    alt="edit"
                    width={20}
                    height={20}
                  />
                </IconButton>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openAdd} onClose={handleCloseAdd} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleAddSubmit}>
          <DialogTitle fontWeight={600}>Add New Category</DialogTitle>
          <DialogContent dividers>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}
            >
              <TextField
                label="Category Name"
                variant="outlined"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                fullWidth
                required
              />
              <Button variant="outlined" component="label">
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </Button>
              {image && (
                <Typography variant="body2" color="text.secondary">
                  Selected: {image.name}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={openView}
        onClose={handleCloseView}
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen}
      >
        <Box component="form" onSubmit={editFun}>
          <DialogTitle fontWeight={600}>Edit Category</DialogTitle>
          <DialogContent dividers>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}
            >
              <TextField
                label="Category Name"
                variant="outlined"
                value={editCategoryName}
                onChange={(e) => seteditCategoryName(e.target.value)}
                fullWidth
                required
              />
              <Button variant="outlined" component="label">
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setEditCategoryImage(e.target.files[0])}
                />
              </Button>
              {editImage && (
                <div className="">
                  <Typography variant="body2" color="text.secondary">
                    Selected: {editImage.name}
                  </Typography>
                </div>
              )}
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
    </Box>
  );
};

export default Categories;
