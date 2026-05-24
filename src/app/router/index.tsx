import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomersPage } from "../../modules/customer/presentation/pages/customer-page";
import CustomersIdPage from "../../modules/customer/presentation/pages/customer-id-page";
import Login from "../../modules/login/presentation/pages/login.view";
import { PrivateRoute } from "../../shared/components/layout/auth/presentation/routes/private-route";
import { PublicRoute } from "../../shared/components/layout/auth/presentation/routes/public-route";
import { PrivateLayout } from "../../shared/components/layout/auth/presentation/layouts/private-layout";
import { CarsPage } from "../../modules/cars/presentation/pages/cars-page";
import CarDetailsPage from "../../modules/cars/presentation/pages/cars-id";

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
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/:id" element={<CustomersIdPage />} />

          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
