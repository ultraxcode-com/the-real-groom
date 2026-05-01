import { Outlet } from "react-router-dom";
import  {Navbar } from "./components/Navbar";
import  {Footer }   from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6f0e7] text-[#1f1b16]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}