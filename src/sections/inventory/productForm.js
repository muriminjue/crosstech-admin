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
} from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";

const ProductForm = (props) => {
  const user = JSON.parse(localStorage.getItem("user")).token;
  const [open, setOpen] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const [resMsg, setResMsg] = useState({ status: "info", message: "" });
  const [prod, setProd] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [measure, setMeasure] = useState("");

  const handleClose = () => {
    props.changeStatus(false);
    props.afterWards();
  };
  useEffect(() => {
    setOpen(props.status);
    if (props.prod) {
      setProd(props.prod);
    }
    setName(prod.name);
    setDescription(prod.description);
    setMeasure(prod.measure);

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
  }, [props, prod, open]);

  const newProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("measure", measure);
    await axios
      .post(process.env.REACT_APP_API_BASE + "/product", data, {
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
  const changeProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("measure", measure);
    await axios
      .put(`${process.env.REACT_APP_API_BASE}/product/${prod.id}`, data, {
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

  const secondButton = () => {
    if (prod.id) {
      return <Button onClick={changeProduct}>Update</Button>;
    } else {
      return <Button onClick={newProduct}>Submit</Button>;
    }
  };
const justClose = () => {
  setIsopen(false);
}
  return (
    <Fragment>
      <Snackbar
        open={isopen}
        autoHideDuration={6000}
        onClose={justClose}
      >
        <Alert
          onClose={justClose}
          severity={resMsg.status}
          sx={{ width: "100%" }}
        >
          {resMsg.message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Product</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <TextField
              label={"Name"}
              value={name}
              onChange={(e) => {
                let { value } = e.target;
                setName(value);
              }}
              variant="standard"
              required={true}
            />
            <TextField
              label={"Description"}
              value={description}
              onChange={(e) => {
                let { value } = e.target;
                setDescription(value);
              }}
              variant="standard"
            />
            <TextField
              label={"Units"}
              value={measure}
              onChange={(e) => {
                let { value } = e.target;
                setMeasure(value);
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

export default ProductForm;
