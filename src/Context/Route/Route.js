import { Routes, Route,  BrowserRouter } from "react-router-dom";

import HomePage from '../../Component/Pages/HomePage/HomePage'
import AboutAs from "../../Component/Pages/AboutAs/AboutAs";
import EventsSection from "../../Component/Pages/Event/Event";
function RouteMmgmt(){

    return  (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutAs" element={<AboutAs/>} />
            <Route path="/events" element={<EventsSection/>}/>
        </Routes>
    </BrowserRouter>    
    );
}

export default RouteMmgmt