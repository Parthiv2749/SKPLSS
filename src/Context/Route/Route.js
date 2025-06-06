import { Routes, Route,  BrowserRouter } from "react-router-dom";

import HomePage from '../../Component/Pages/HomePage/HomePage'
import AboutAs from "../../Component/Pages/AboutAs/AboutAs";
function RouteMmgmt(){

    return  (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutAs" element={<AboutAs/>} />
        </Routes>
    </BrowserRouter>    
    );
}

export default RouteMmgmt