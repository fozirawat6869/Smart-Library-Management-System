
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try{
    const decodedToken = jwtDecode(token);

    if(allowedRoles.includes(decodedToken.role)){
      return <Outlet />;
    }

    // unauthorized
    alert("You are not authorized to access this page.");
    return <Navigate to="/login" replace />;

  }catch (error){
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

};

export default PrivateRoute;
