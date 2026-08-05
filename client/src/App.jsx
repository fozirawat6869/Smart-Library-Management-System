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
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";
import AdminCategories from "./pages/adminPages/AdminCategories";
import AddBooks from "./pages/adminPages/AddBooks";
import AllBooks from "./pages/adminPages/AllBooks";
import AllUsers from "./pages/adminPages/AllUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin route */}
        {/* <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/add-books" element={<AddBooks />} />
          </Route>
        </Route> */}

        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="add-books" element={<AddBooks />} />
            <Route path="allUsers" element={<AllUsers />} />
            <Route path="allBooks" element={<AllBooks />} />
          </Route>
        </Route>

        {/* Student routes */}
        <Route element={<PrivateRoute allowedRoles={["student"]} />}>
          <Route element={<StudentLayout />}>
            {" "}
            // student layout is in components
            <Route path="/home" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:categoryId" element={<Books />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/borrow-cart" element={<BorrowCart />} />
            <Route path="/learn-more" element={<LearnMore />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
