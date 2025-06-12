import { Routes, Route,  BrowserRouter } from "react-router-dom";

import HomePage from '../../Component/Pages/HomePage/HomePage'
import AboutAs from "../../Component/Pages/AboutAs/AboutAs";
import EventsSection from "../../Component/Pages/Event/Event";
import Gallary from "../../Component/Pages/Gallary/Gallary";
function RouteMmgmt(){

    return  (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutAs" element={<AboutAs/>} />
            <Route path="/events" element={<EventsSection/>}/>
            <Route path="/Gallery" element={<Gallary/>}/>
        </Routes>
    </BrowserRouter>    
    );
}

export default RouteMmgmt