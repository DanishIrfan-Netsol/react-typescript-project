import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { GetAllProducts, GetCustomerSubscription } from "../../helper";
import LoginDialog from "./loginDialog";
import { Pagination } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"© 2024 DigitalVistaHub.com. All Rights Reserved."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [totalPages, setTotalPages] = useState(10);
  const [productsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstPost, indexOfLastPost);

  const token = localStorage.getItem("token");

  const [subscriptions, setSubscriptions] = useState([]);

  const fetchAllCustomers = async () => {
    const response = await GetAllProducts();
    const products = response?.data;
    setProducts(products);
    setTotalPages(Math.ceil(products?.length / productsPerPage));
  };

  const handleSubscribe = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    console.log("Album component rendered");
    fetchAllCustomers();
  }, []);

  const getCustomerSubscription = async () => {
    const response = await GetCustomerSubscription();
    console.log("response for getCustomerSubscription", response);
    setSubscriptions(response?.data);
  };

  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    if (customerId) {
      getCustomerSubscription();
    }
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Stripe Products
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Laptop Showcase: Power and Elegance Unleashed!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Showcasing an impressive lineup of laptops - power-packed, sleek,
              and ready to elevate your computing experience.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Products</Button>
              <Button variant="outlined">Services</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {currentProducts?.map(
              (product: {
                id: string;
                name: string;
                description: string;
                images: {}[];
              }) => (
                <Grid item key={product?.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image={product?.images[0] as string}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product?.name}
                      </Typography>
                      <Typography>
                        {`${product?.description?.slice(0, 100)}...`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={handleSubscribe} size="small">
                        Subscribe
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </Container>
      </main>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          onChange={handleChangePage as any}
          variant="outlined"
          shape="rounded"
        />
      </div>

      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Connect With Us
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Follow for tech updates and exclusive offers.
        </Typography>
        <Copyright />
      </Box>
      {!token && (
        <LoginDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      )}
    </ThemeProvider>
  );
}
