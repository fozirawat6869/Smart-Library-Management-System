import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Books from "./pages/Books";
import Category from "./pages/Category";
import Navbar from "./components/Navbar";
import NewArrivals from "./pages/NewArrivals";
import BorrowCart from "./pages/BorrowCart";
import LearnMore from "./pages/LearnMore";
import AdminHome from "./pages/adminPages/AdminHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
        </Route>

        {/*Book page*/}
        <Route
          path="/books"
          element={
            <>
              <Navbar />
              <Books />
            </>
          }
        />

        <Route path="/books/:categoryId" element={<Books />} />

        <Route
          path="/categories"
          element={
            <>
              <Navbar />
              <Category />
            </>
          }
        />

        <Route
          path="/new-arrivals"
          element={
            <>
              <Navbar />
              <NewArrivals />
            </>
          }
        />

        <Route
          path="/borrow-cart"
          element={
            <>
              <Navbar />
              <BorrowCart />
            </>
          }
        />

        <Route
          path="/learn-more"
          element={
            <PrivateRoute>
              <LearnMore />
            </PrivateRoute>
          }
        />

        {/* Admin route */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/adminhome"
            element={
              <>
                <Navbar />
                <AdminHome />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
