// // src/components/PrivateRoute.jsx
// import { jwtdecode } from "jwt-decode";

// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = () => {
//   const token = localStorage.getItem("token");
//   const decodedToken = jwtdecode(token);

//   console.log("PrivateRoute token:", token); // Debugging line
//   console.log("token role ", decodedToken);

//   return token ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  console.log("Token:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decodedToken = jwtDecode(token);

  console.log("Decoded Token:", decodedToken);
  console.log("Role:", decodedToken.role);

  if (decodedToken.role === "user") {
    console.log("User Route");
    return <Outlet />;
  }

  if (decodedToken.role === "admin") {
    console.log("Admin Route");
    return <Outlet />;
  }

  console.log("No matching role");
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
