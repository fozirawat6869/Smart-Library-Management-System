import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const StudentLayout = () => {
  return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
    
      <Navbar />
      <Outlet />

    </div>
  );
};

export default StudentLayout;