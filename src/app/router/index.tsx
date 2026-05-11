import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomersPage } from "../../modules/customer/presentation/pages/customer-page";
import CustomersIdPage from "../../modules/customer/presentation/pages/customer-id-page";
import Login from "../../modules/login/presentation/pages/login.view";
import { PrivateRoute } from "../../shared/auth/presentation/routes/private-route";
import { PublicRoute } from "../../shared/auth/presentation/routes/public-route";
import { PrivateLayout } from "../../shared/auth/presentation/layouts/private-layout";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<CustomersPage />} />
          <Route path="/Customers/:id" element={<CustomersIdPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
