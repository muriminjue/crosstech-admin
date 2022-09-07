import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Stack,
  MenuItem,
} from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";

const PackageForm = (props) => {
  const user = JSON.parse(localStorage.getItem("user")).token;
  const [open, setOpen] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const [resMsg, setResMsg] = useState({ status: "info", message: "" });
  const [pack, setPack] = useState([]);
  const [measure, setMeasure] = useState("");

  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const handleClose = () => {
    props.changePackstatus(false);
    props.afterWards();
  };
  const newPackage = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("product", product);
    data.append("quantity", quantity);
    data.append("price", price);
    await axios
      .post(process.env.REACT_APP_API_BASE + "/package", data, {
        headers: { Authorization: "Bearer " + user },
      })
      .then((response) => {
        setResMsg({ status: "success", message: response.data.msg });
        setIsopen(true);
        handleClose();
      })
      .catch((error) => {
        setResMsg({ status: "success", message: error.response.data.msg });
        setIsopen(true);
      });
  };

  const changePackage = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("product", product);
    data.append("quantity", quantity);
    data.append("price", price);
    await axios
      .put(`${process.env.REACT_APP_API_BASE}/package/${pack.id}`, data, {
        headers: { Authorization: "Bearer " + user },
      })
      .then((response) => {
        setResMsg({ status: "success", message: response.data.msg });
        setIsopen(true);
        handleClose();
      })
      .catch((error) => {
        setResMsg({ status: "success", message: error.response.data.msg });
        setIsopen(true);
      });
  };
  useEffect(() => {
    setOpen(props.status);
    if (props.pack) {
      setPack(props.pack);
    }
    setProduct(pack.productId);
    setQuantity(pack.quantity);
    setPrice(pack.price);

    // axios
    // .get(process.env.REACT_APP_API_BASE + "/product/"+ props.prodid,
    // {  headers: { Authorization: "Bearer " + user },  })
    // .then((response) => {
    //   console.log(prodid)
    //   console.log(response.data)
    //   setName(response.data.name)
    // })
    // .catch((error) => {
    //   setResMsg({ status: "success", message: error.response.data.msg });
    //   setIsopen(true);
    // });
  }, [props, pack, open]);
  const secondButton = () => {
    if (pack.id) {
      return <Button onClick={changePackage}>Update</Button>;
    } else {
      return <Button onClick={newPackage}>Submit</Button>;
    }
  };
  const justClose = () => {
    setIsopen(false);
  };
  return (
    <Fragment>
      <Snackbar open={isopen} autoHideDuration={6000} onClose={justClose}>
        <Alert
          onClose={justClose}
          severity={resMsg.status}
          sx={{ width: "100%" }}
        >
          {resMsg.message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Package</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <TextField
              label={"product"}
              value={product}
              onChange={(e) => {
                let { value } = e.target;
                setProduct(value);
                setMeasure(
                  props.products.filter((item) => item.id === value)[0].measure
                );
              }}
              variant="standard"
              required={true}
              select
            >
              {props.products.map((item) => {
                return <MenuItem value={item.id}>{item.name}</MenuItem>;
              })}
            </TextField>
            <TextField
              type="number"
              label={"Quantity in " + measure}
              value={quantity}
              onChange={(e) => {
                let { value } = e.target;
                setQuantity(value);
              }}
              required={true}
              variant="standard"
            />
            <TextField
            type="number"
              label={"Proposed Price"}
              value={price}
              onChange={(e) => {
                let { value } = e.target;
                setPrice(value);
              }}
              variant="standard"
              required={true}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {secondButton()}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default PackageForm;
