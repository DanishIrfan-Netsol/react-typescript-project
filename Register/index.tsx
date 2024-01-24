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
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RegisterFormSchema } from "./RegisterFormSchema";
import { RegisterFormData } from "./types";
import { v4 as uuid } from "uuid";
import { CreateCustomer, SignUp } from "../../helper";
import { useSnackbar } from "notistack";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const { email, password } = data;

    const response = await SignUp({ email, password, role: uuid() });

    if (!response) {
      enqueueSnackbar("User registered successfully", { variant: "success" });
      navigate("/login", { replace: true });
    } else {
      const responseData = await JSON.parse(response as any);
      const errors = responseData?.errors;
      errors.map((error: string) =>
        enqueueSnackbar(error, { variant: "error" })
      );
    }

    const registerCustomer = await CreateCustomer({ email });
    console.log("======registerCustomer", registerCustomer);
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
            Sign Up
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
