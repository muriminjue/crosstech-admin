import { useEffect, useState, Fragment, useCallback, forwardRef } from "react";
import axios from "axios";
import {
  Box,
  Collapse,
  Typography,
  Snackbar,
  Table,
  Paper,
  TableHead,
  TableCell,
  TableContainer,
  TableBody,
  TableRow,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import {Edit} from "@mui/icons-material"
import MuiAlert from "@mui/material/Alert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ProductForm from "./productForm";
import PackageForm from "./packageForm";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Row(props) {
  const { row } = props;
  const [isopen, setisOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setisOpen(!isopen)}
          >
            {isopen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell align="right">{row.amount}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <TableCell>
          <Stack direction="column">
            <Button
              variant="contained"
              color="warning"
              sx={{ my: 0.5 }}
              size="small"
              onClick={(e) => props.editProduct(row.id)}
            >
              Edit
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isopen} timeout="auto" unmountOnExit>
            <Box sx={{ mx: 5, my: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Packages
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Proposed Price</TableCell>
                    <TableCell align="right">In Stock</TableCell>
                    <TableCell align="right">In Stock</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Packages.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.quantity}
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell align="right">{item.number}</TableCell>
                      <TableCell>
                        <Stack direction="column">
                          <IconButton
                          aria-label="delete"
                            color="warning"
                            sx={{ my: 0.5 }}
                            size="small"
                            onClick={(e) => props.editPackage(item.id)}
                          >
                           <Edit />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const Products = () => {
  const user = JSON.parse(localStorage.getItem("user")).token;
  const [prodForm, setProdForm] = useState(false);
  const [prod, setProd] = useState("");
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ status: "info", message: "" });
  const [packForm, setPackForm] = useState(false);
  const [pack, setPack] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const getProducts = useCallback(async () => {
    await axios
      .get(process.env.REACT_APP_API_BASE + "/product", {
        headers: { Authorization: "Bearer " + user },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setMessage({ status: "error", message: error.response.data.msg });
        setOpen(true);
      });
  }, [user]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const addProduct = () => {
    if (prodForm === true) {
      setProdForm(false);
      setTimeout(() => {
        setProdForm(true);
      }, 500);
    } else {
      setProdForm(true);
    }
  };
  const changeStatus = () => {
    setProd([]);
    setProdForm(false);
  };
  const editProduct = async (value) => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE}/product/${value}`, {
        headers: { Authorization: "Bearer " + user },
      })
      .then((response) => {
        setProd(response.data);
        if (prodForm === true) {
          setProdForm(false);
          setTimeout(() => {
            setProdForm(true);
          }, 500);
        } else {
          setProdForm(true);
        }
      })
      .catch((error) => {
        setMessage({ status: "error", message: error.response.data.msg });
        setOpen(true);
      });
  };

  const addPackage = () => {
    if (packForm === true) {
      setPackForm(false);
      setTimeout(() => {
        setPackForm(true);
      }, 500);
    } else {
      setPackForm(true);
    }
  };

  const changePackstatus = () => {
    setPack([]);
    setPackForm(false);
  };

  const editPackage = async (value) => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE}/package/${value}`, {
        headers: { Authorization: "Bearer " + user },
      })
      .then((response) => {
        setPack(response.data);
        if (packForm === true) {
          setPackForm(false);
          setTimeout(() => {
            setPackForm(true);
          }, 500);
        } else {
          setPackForm(true);
        }
      })
      .catch((error) => {
        setMessage({ status: "error", message: error.response.data.msg });
        setOpen(true);
      });
  };

  return (
    <Fragment>
      <ProductForm
        status={prodForm}
        prod={prod}
        afterWards={getProducts}
        changeStatus={changeStatus}
      />
      <PackageForm
        status={packForm}
        pack={pack}
        afterWards={getProducts}
        changePackstatus={changePackstatus}
        products={products}
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(e) => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={handleClose}
          severity={message.status}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
      <TableContainer component={Paper}>
        <Typography variant="h5" gutterBottom component="div">
          products
        </Typography>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <Row
                key={row.id}
                row={row}
                editProduct={editProduct}
                editPackage={editPackage}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" onClick={addProduct} sx={{ m: 1 }}>
        Add Product
      </Button>
      <Button variant="contained" onClick={addPackage} sx={{ m: 1 }}>
        Add Package
      </Button>
    </Fragment>
  );
};

export default Products;
