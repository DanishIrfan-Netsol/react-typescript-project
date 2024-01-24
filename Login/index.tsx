import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GetCustomer, Login } from "../../helper";
import { LoginFormSchema } from "./LoginFormSchema";
import { LoginFormData } from "./types";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginFormSchema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormData> = async (params) => {
    const response = await Login(params);
    const data = await JSON.parse(response as any);

    if (data?.errors?.length) {
      const errors = data?.errors;
      errors.map((error: string) =>
        enqueueSnackbar(error, { variant: "error" })
      );
    } else {
      const token = data.token;
      localStorage.setItem("token", token);
      enqueueSnackbar("User logged in successfully", { variant: "success" });
      const getCustomer = await GetCustomer(params);
      console.log("getCustomer", getCustomer);
      const customerId = getCustomer?.data?.[0]?.id;
      localStorage.setItem("customerId", customerId);
      navigate("/", { replace: true });
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              label="Email Address"
              {...register("email")}
            />

            <br />
            <br />
            <TextField
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              label="Password"
              {...register("password")}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
