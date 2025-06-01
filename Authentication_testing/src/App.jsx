import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

import CreateFigureForm from "./pages/CreateFigureForm";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import ActionFigureList from "./pages/ActionFigureList";
import EditFigureForm from "./pages/EditFigureForm";
import FigureDetails from "./pages/FigureDetails";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./pages/Navbar";

import "./assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./pages/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";

// Wrapper to access location and apply logic
const AppWrapper = () => {
  const location = useLocation();

  // Add any paths where you want to HIDE the Navbar
  const hideNavbarPaths = ["/login", "/register"];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/action-figures" element={<ActionFigureList />} />
          <Route path="/create-action-figure" element={<CreateFigureForm />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/edit-figure/:id" element={<EditFigureForm />} />
          <Route path="/figure-details/:id" element={<FigureDetails />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
