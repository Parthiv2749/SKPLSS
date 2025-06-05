import { Routes, Route,  BrowserRouter } from "react-router-dom";

import HomePage from '../../Component/Pages/HomePage/HomePage'

function RouteMmgmt(){

    return  (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    </BrowserRouter>    
    );
}

export default RouteMmgmt