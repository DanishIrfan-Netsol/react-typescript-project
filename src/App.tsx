import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./modules/Layout";
import ProtectedRoute from "./modules/ProtectedRoute";

function App() {
  const Home = lazy(() => import("./modules/Home"));
  const Login = lazy(() => import("./modules/Login"));
  const Register = lazy(() => import("./modules/Register"));
  const NotFound = lazy(() => import("./modules/NotFound"));
  const Pricing = lazy(() => import("./modules/Pricing"));

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route
            path="/"
            element={
              // <ProtectedRoute>
              <Home />
              // </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
