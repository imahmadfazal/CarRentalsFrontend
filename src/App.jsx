import "./App.css";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./assets/PageLoader";
import Home from "./assets/homeherosec/Home";
import CarDetailsPage from "./assets/CarDetail/Cardetailspage";
import ServicePage from "./assets/ServicePage/Servicepage";
import AboutPage from "./assets/AboutPage/AboutPage";
import CustomCursor from "./assets/CustomCursor/CustomCursor";
import AvailableCarsPage from "./assets/AvailableCars/AvailableCarsPage";
import BookingPage from "./assets/Booking/BookingPage";
import BookingConfirmationPage from "./assets/BookingConfirmation/BookingConfirmationPage";
import SignInPage from "./assets/Auth/SignInPage";
import SignUpPage from "./assets/Auth/SignUpPage";
import MyBookingsPage from "./assets/MyBookings/MyBookingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboardPage from "./admin/AdminDashboardPage";
import AdminBookingsPage from "./admin/AdminBookingsPage";
import AdminUsersPage from "./admin/AdminUsersPage";
import AdminCarsPage from "./admin/AdminCarsPage";
import AdminCarImagesPage from "./admin/AdminCarImagesPage";
import AdminCarMediaPage from "./admin/AdminCarMediaPage";

function App() {
  return (
    <PageLoader loaderText="CAR RENTAL" holdDuration={2}>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car/:carId" element={<CarDetailsPage />} />
        <Route path="/available-cars" element={<AvailableCarsPage />} />
        <Route
          path="/booking/:carId"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-confirmation"
          element={
            <ProtectedRoute>
              <BookingConfirmationPage />
            </ProtectedRoute>
          }
        />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="cars" element={<AdminCarsPage />} />
          <Route path="cars/images" element={<AdminCarImagesPage />} />
          <Route path="cars/media" element={<AdminCarMediaPage />} />
        </Route>
      </Routes>
    </PageLoader>
  );
}

export default App;
