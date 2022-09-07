import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Snackbar, Chip, Button } from "@mui/material";
//import {KeyboardArrowRight} from "@"

const Stockings = () => {
  const user = JSON.parse(localStorage.getItem("user")).token;
  const [stockings, setStockings] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const onReceipt = (value) => {
    const link = document.createElement("a");
    link.download = value;
    link.href = process.env.REACT_APP_FILE_API + value;
    link.click();
  };

  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE + "/stock/purchasedetailed", {
        headers: { Authorization: "Bearer " + user },
      })
      .then((response) => {
        setStockings(response.data);
      })
      .catch((error) => {
        setMessage(error.response.data.msg);
        setOpen(true);
      });
  }, [user]);

  const options = {
    filterType: "dropdown",
    selectableRows: "none",
    enableNestedDataAccess: ".",
  };
  const columns = [
    {
      name: "createdAt",
      label: "Date",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return new Date(value).toLocaleDateString()
        },
      },
    },
    {
      name: "Product.name",
      label: "Product",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "quantity",
      label: "Quantity",
      options: {
        filter: false,
        sort: true,
      },
    },

    {
      name: "cost",
      label: "Cost",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "invoiceNo",
      label: "Invoice No",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Supplier.fullname",
      label: "Supplier",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "User.username",
      label: "by",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "adjusted",
      label: "Adjusted",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Chip label={value.toString()} />;
        },
      },
    },

    {
      name: "receipt",
      label: "Receipt",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value) {
            return (
              <Button
                onClick={() => onReceipt(value)}
                variant="contained"
                color="warning"
              >
                Download
              </Button>
            );
          } else {
            return <Chip label="upload" />;
          }
        },
      },
    },
  ];
  const data = stockings;
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default Stockings;
