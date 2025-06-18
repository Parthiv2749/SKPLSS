import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../reusable/SidebarLayout";
import events from "../../../assets/eventsarray";
import Members from "../../../assets/MembersArray";
import { Calendar, ImageIcon, UsersIcon, Upload, FileUp } from "lucide-react";

// Local Card component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-md ${className}`}>
    {children}
  </div>
);

// Local CardContent
const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// Local Button
const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition";
  const variants = {
    default: "bg-[#F48F0F] text-white hover:bg-[#e1800d]",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    link: "text-[#F48F0F] hover:underline p-0",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const exportToCSV = (data, filename = "members.csv") => {
  const csvRows = [];

  // Get headers
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  // Format data rows
  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  // Create blob and download
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [photoCount, setPhotoCount] = useState(3500);
  useEffect(() => {
    const fetchPhotoCount = async () => {
      try {
        const response = await fetch("/api/photo-count"); // 👈 your backend route
        if (!response.ok) throw new Error("Network response not ok");
        const data = await response.json();
        if (data?.count) setPhotoCount(data.count);
      } catch (error) {
        console.error("Failed to fetch photo count, using fallback:", error);
      }
    };

    fetchPhotoCount();
  }, []);

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-[#FDF8F3]  ">
        <h2 className="text-2xl font-semibold">Welcome...</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Members */}
          <Card className="flex flex-col items-center text-center py-8 gap-3 transform transition duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded-full mb-3">
              <UsersIcon className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-gray-600 font-medium">Total Members</p>
            <p className="text-2xl font-bold">{Members.length}</p>
            <Button
              variant="link"
              onClick={() => navigate("/Admin/Members")}
              className="mt-1 text-sm"
            >
              Manage Members
            </Button>
          </Card>

          {/* All-Time Events */}
          <Card className="flex flex-col items-center text-center py-8 gap-3 transform transition duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600 font-medium">All-Time Events</p>
            <p className="text-2xl font-bold">{events.length}</p>
            <Button
              variant="link"
              onClick={() => navigate("/Admin/events")}
              className="mt-1 text-sm"
            >
              Manage Events
            </Button>
          </Card>

          {/* Gallery Uploads */}
          <Card className="flex flex-col items-center text-center py-8 gap-3 transform transition duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded-full">
              <ImageIcon className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-gray-600 font-medium">Gallery Uploads</p>
            <p className="text-2xl font-bold">{photoCount}+</p>
            <Button
              variant="link"
              onClick={() => navigate("/Admin/Gallery")}
              className="mt-1 text-sm"
            >
              Manage Gallery
            </Button>
          </Card>
        </div>

        {/* Quick Actions Only */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="lg:col-span-2">
            <CardContent>
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                <Button
                  variant="outline"
                  onClick={() => navigate("/Admin/Gallery")}
                  className="flex flex-col gap-1 items-center justify-center p-4 rounded-xl transition-all duration-300 hover:text-[#F48F0F] hover:border-[#F48F0F] hover:text-[#F48F0F]"
                >
                  <Upload className="w-5 h-5" />
                  <span className="text-sm">Upload Gallery</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(`/Admin/Schedule-Event/${events.length + 1}`)
                  }
                  className="flex flex-col gap-1 items-center justify-center p-4 rounded-xl transition-all duration-300 hover:text-[#F48F0F] hover:border-[#F48F0F] hover:text-[#F48F0F]"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Add Event</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => exportToCSV(Members)}
                  className="flex flex-col gap-1 items-center justify-center p-4 rounded-xl transition-all duration-300 hover:text-[#F48F0F] hover:border-[#F48F0F] hover:text-[#F48F0F]"
                >
                  <FileUp className="w-5 h-5" />
                  <span className="text-sm">Export Members Data</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Dashboard;
