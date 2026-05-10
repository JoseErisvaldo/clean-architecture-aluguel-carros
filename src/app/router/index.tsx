import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomersPage } from "../../modules/customer/presentation/pages/customer-page";
import CustomersIdPage from "../../modules/customer/presentation/pages/customer-id-page";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomersPage />} />
        <Route path="/Customers/:id" element={<CustomersIdPage />} />
      </Routes>
    </BrowserRouter>
  );
}
