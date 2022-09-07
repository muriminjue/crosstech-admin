import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Snackbar, Chip } from "@mui/material";


const Packagings = () => {
  const user = JSON.parse(localStorage.getItem("user")).token;
  const [packagings, setPackagings] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE + "/stock/package", {
        headers: { Authorization: "Bearer " + user },
      })
      .then((response) => {
        setPackagings(response.data);
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
          return new Date(value).toLocaleDateString();
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
      name: "Package.quantity",
      label: "Package Size",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "number",
      label: "Number",
      options: {
        filter: false,
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
      name: "removed",
      label: "Revoked",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Chip label={value.toString()} />;
        },
      },
    },
  ];
  const data = packagings;
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

export default Packagings;
