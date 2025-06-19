import React, { useState, useEffect, useRef } from "react";

const EditUserModal = ({ user, roles = [], onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
  });

  const modalRef = useRef();

  useEffect(() => {
    // Autofill if editing
    if (user) {
      setFormData(user);
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user, onClose]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.role) return;
    const newUser = {
      ...formData,
      id: formData.id ?? Date.now(),
    };
    onSave(newUser);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4"
      onMouseDown={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4"
      >
        <h3 className="text-lg font-bold text-[#292929]">
          {formData.id ? "Edit User" : "Add User"}
        </h3>
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          >
            <option value="">Select Role</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end pt-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#F48F0F] text-white rounded-lg text-sm shadow hover:bg-[#dc7d00]"
          >
            {formData.id ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
