import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"; // Import Footer
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/book/:courtId/:startDate/:endDate" element={<Booking />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="*" element={<Home />} />
                </Routes>
                <Footer /> 
            </BrowserRouter>
        </div>
    );
}

export default App;