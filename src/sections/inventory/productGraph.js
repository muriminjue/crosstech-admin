import axios from "axios";
import { useState, useCallback, Fragment, forwardRef, useEffect } from "react";
import { Snackbar, Card, CardContent } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ReactApexChart from "react-apexcharts";
import merge from 'lodash/merge';
import { BaseOptionChart } from '../../components/chart';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductGraph = () => {
  const user = JSON.parse(localStorage.getItem("user")).token;
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ status: "info", message: "" });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const getProducts = useCallback(async () => {
    await axios
      .get(process.env.REACT_APP_API_BASE + "/productdetailed", {
        headers: { Authorization: "Bearer " + user },
      })
      .then((response) => {
        console.log(response.data);
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

let  chartLabels =products.Stockings.map((item)=> item.createdAt.getMonth())
let chartData = products.map((item)=> [{name:item.name,type:"line", fill: "series", data: item.Stockings }])
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
  });

 
  return (
    <Fragment>
      <Card variant="outlined" sx={{ minWidth: "50%" }}>
        <CardContent>
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
          <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ProductGraph;
