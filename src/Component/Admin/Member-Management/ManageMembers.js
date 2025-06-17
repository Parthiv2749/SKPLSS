import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaFilter, FaCog } from "react-icons/fa";
import SidebarLayout from "../reusable/SidebarLayout";
import CustomTable from "../reusable/CustomTable";
import initialMembers from "../../../assets/MembersArray";
import DeleteConfirmation from "../reusable/DeleteConfirmation";
import MemberModal from "../Member-Management/MemberModal";


const ManageMembers = () => {
  const [members, setMembers] = useState(initialMembers);
  const [formData, setFormData] = useState(null);
  const [mode, setMode] = useState(""); 
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    membership_id: true,
    name: true,
    dob: true,
    gender: true,
    mobile: true,
    email: true,
    designation: true,
  });

  const [showSettings, setShowSettings] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ designation: "", gender: "" });

  const designationOptions = [...new Set(members.map((m) => m.designation))];
  const genderOptions = [...new Set(members.map((m) => m.gender))];

  const filteredMembers = members.filter((member) => {
    const matchName = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchDesignation = filters.designation
      ? member.designation === filters.designation
      : true;
    const matchGender = filters.gender
      ? member.gender.toLowerCase() === filters.gender.toLowerCase()
      : true;
    return matchName && matchDesignation && matchGender;
  });

  const generateNewId = () => {
    const existingIds = members.map((m) => m.membership_id);
    let count = members.length + 1;
    let id;
    do {
      id = `SKL${String(count).padStart(3, "0")}`;
      count++;
    } while (existingIds.includes(id));
    return id;
  };

  const handleAddClick = () => {
    setMode("add");
    setFormData({
      membership_id: generateNewId(),
      name: "",
      dob: "",
      gender: "M",
      mobile: "",
      email: "",
      designation: "",
    });
  };

  const handleEditClick = (member) => {
    setMode("edit");
    setFormData({ ...member });
  };

  const handleCancelForm = () => {
    setFormData(null);
    setMode("");
  };

  const handleSaveForm = () => {
    if (mode === "edit") {
      const updated = members.map((m) =>
        m.membership_id === formData.membership_id ? formData : m
      );
      setMembers(updated);
    } else if (mode === "add") {
      setMembers((prev) => [...prev, formData]);
      alert(`Membership Id: ${formData.membership_id}`);
    }
    handleCancelForm();
  };

  const handleDelete = (id) => {
    setMembers((prev) => prev.filter((m) => m.membership_id !== id));
    setDeleteTarget(null);
  };

  return (
    <SidebarLayout>
      <div className="w-full bg-[#FDF8F3] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Member Management</h1>
          <button
            onClick={handleAddClick}
            className="bg-[#F48F0F] text-white md:px-4 px-2 py-1 md:py-2 rounded-xl hover:opacity-90"
          >
            Add New Member
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 relative">
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-full sm:max-w-md border border-gray-300">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by Name"
              className="outline-none w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 self-end sm:self-auto">
            <div className="relative">
              <FaFilter
                className="text-[#F48F0F] cursor-pointer text-xl hover:opacity-70"
                onClick={() => setShowFilters(!showFilters)}
              />
              {showFilters && (
                <div className="absolute top-10 right-0 w-72 max-w-[90vw] bg-white shadow-lg rounded-md p-4 z-20 border border-gray-200 flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">
                      Designation
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      value={filters.designation}
                      onChange={(e) =>
                        setFilters({ ...filters, designation: e.target.value })
                      }
                    >
                      <option value="">All</option>
                      {designationOptions.map((d, i) => (
                        <option key={i} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">
                      Gender
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      value={filters.gender}
                      onChange={(e) =>
                        setFilters({ ...filters, gender: e.target.value })
                      }
                    >
                      <option value="">All</option>
                      {genderOptions.map((g, i) => (
                        <option key={i} value={g}>
                          {g === "M" ? "Male" : "Female"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <FaCog
                className="text-[#F48F0F] cursor-pointer text-xl hover:opacity-70"
                onClick={() => setShowSettings(!showSettings)}
              />
              {showSettings && (
                <div className="absolute top-8 right-0 bg-white shadow-lg rounded-md p-4 z-20 border border-gray-200">
                  {Object.keys(visibleColumns).map((col) => (
                    <label key={col} className="block text-sm mb-2 capitalize">
                      <input
                        type="checkbox"
                        checked={visibleColumns[col]}
                        onChange={() =>
                          setVisibleColumns({
                            ...visibleColumns,
                            [col]: !visibleColumns[col],
                          })
                        }
                        className="mr-2"
                      />
                      Show {col.replace("_", " ")}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <CustomTable
          cols={[
            { key: "membership_id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "dob", label: "Date of Birth" },
            { key: "gender", label: "Gender" },
            { key: "mobile", label: "Mobile" },
            { key: "email", label: "Email" },
            { key: "designation", label: "Designation" },
          ]}
          rows={filteredMembers.map((m) => ({
            ...m,
            gender: m.gender === "M" ? "Male" : "Female",
            actions: (
              <>
                <FaEdit
                  className="text-[#F48F0F] cursor-pointer mr-2"
                  onClick={() => handleEditClick(m)}
                />
                <FaTrash
                  className="text-[#F48F0F] cursor-pointer"
                  onClick={() => setDeleteTarget(m)}
                />
              </>
            ),
          }))}
          visibleCols={visibleColumns}
        />

        {/* Edit/Add Modal */}
        {formData && (
          <MemberModal
            mode={mode}
            formData={formData}
            setFormData={setFormData}
            onCancel={handleCancelForm}
            onSave={handleSaveForm}
          />
        )}

        {/* Delete Modal */}
        {deleteTarget && (
          <DeleteConfirmation
            onCancel={() => setDeleteTarget(null)}
            onConfirm={() => handleDelete(deleteTarget.membership_id)}
            title="Delete Member"
            message={`Are you sure you want to delete ${deleteTarget.name}?`}
          />
        )}
      </div>
    </SidebarLayout>
  );
};

export default ManageMembers;
