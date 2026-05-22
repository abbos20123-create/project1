import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Models from "./pages/Models";
import Car from "./pages/Car";
import Offers from "./pages/Offers";
import Servis from "./pages/Servis";
import Contact from "./pages/Contact";
import AdminFace from "./AdminPages/AdminFace";
import AdHomePage from "./AdminPages/AdHomePage";
import AdminCars from "./AdminPages/AdminCars";
import AdminTestdrive from "./AdminPages/AdminTestdrive";
import AdminKomplekt from "./AdminPages/AdminKomplekt";
import AdminContact from "./AdminPages/AdminContact";
import AdminOrders from "./AdminPages/AdminOrders";
import { ToastContainer } from "react-toastify";
import AdminOffers from "./AdminPages/AdminOffers";


function App() {
  return (
    <div>
    <ToastContainer autoClose={2000} /> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/models" element={<Models />} />
      <Route path="/cars/:slug" element={<Car />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/services" element={<Servis />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/" element={<AdminFace />}>
        <Route path="homePage" element={<AdHomePage />} />
        <Route path="cars" element={<AdminCars />} />
        <Route path="testDrive" element={<AdminTestdrive/>} />
        <Route path="komplekt" element={<AdminKomplekt />} />
        <Route path="contact" element={<AdminContact />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="offers" element={<AdminOffers />} />
      </Route>
      <Route path="*" element={<h1 className="text-center text-4xl mt-20">404 Not Found</h1>} />
    </Routes>
    </div>
  );
}

export default App;