import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import NotFound from "./Pages/404notFound";
import Signup from "./pages/Signup";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoutes";
import AdminLayer from "./Pages/Admin/AdminLayer";
import UserLayer from "./Pages/Admin/UserLayer";
import UpdateProduct from "./Pages/Admin/UpdateProduct";

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = [
    "/dashboard",
    "/signup",
    "/login",
    "/dashboard/users",
    "/dashboard/updateProduct/:id",
  ];
  const shouldHideNavbar = hideNavbarRoutes.includes(
    location.pathname.toLowerCase()
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
               <UserLayer/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/updateProduct/:id"
          element={
            <ProtectedRoute>
               <UpdateProduct/>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
