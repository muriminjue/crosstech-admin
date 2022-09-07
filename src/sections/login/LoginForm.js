import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [autherr, setAutherr]= useState({status: "info", message: "Welcome. Please login"})

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      await axios
        .post(process.env.REACT_APP_API_BASE + "/login", {
          username: values.email,
          password: values.password,
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          setAutherr({status:"success", message: "Login Succesful"})
          setTimeout(() => {
            navigate("/app", { replace: true });
          }, 1000);
        }).catch((error)=>{
          setAutherr({status:"error", message: error.response.data.msg})
        })
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <div>
      <Alert sx={{ my: 2 }} severity={autherr.status}>
        {autherr.message}
      </Alert>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="right"
            sx={{ my: 2 }}
          >
            <Link
              component={RouterLink}
              variant="subtitle2"
              to="#"
              underline="hover"
            >
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
    </div>
  );
}
