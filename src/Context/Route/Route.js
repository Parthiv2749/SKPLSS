import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomePage from "../../Component/Pages/HomePage/HomePage";
import AboutAs from "../../Component/Pages/AboutAs/AboutAs";
import EventsSection from "../../Component/Pages/Event/Event";
import Gallary from "../../Component/Pages/Gallary/Gallary";
import Dashboard from "../../Component/Admin/Dashboard";
import Login from "../../Component/Admin/Login";
import Event from "../../Component/Admin/ManageEvents";
import Managegallery from "../../Component/Admin/Managegallery";
import ManageMembers from "../../Component/Admin/ManageMembers";


function RouteMmgmt() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutAs" element={<AboutAs />} />
        <Route path="/events" element={<EventsSection />} />
        <Route path="/Gallery" element={<Gallary />} />

        <Route path="/AdminLogin" element={<Login />} />
        <Route path="/Admin" element={<Dashboard />} />
        <Route path="/Admin/events" element={<Event />} />
        <Route path="/Admin/gallery" element={<Managegallery />} />
        <Route path="/Admin/Members" element={<ManageMembers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteMmgmt;
