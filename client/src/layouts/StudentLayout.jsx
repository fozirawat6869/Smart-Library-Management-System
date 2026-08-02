import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const StudentLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default StudentLayout;