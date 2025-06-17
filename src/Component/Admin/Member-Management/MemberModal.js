import React, { useState, useEffect } from "react";

const MemberModal = ({ mode, formData, setFormData, onCancel, onSave }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [formData]);

  if (!formData) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (!/^[2-5]\d{6}$/.test(formData.mobile))
      newErrors.mobile = "Enter 7-digit Seychelles mobile number.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.designation)
      newErrors.designation = "Designation is required.";
    if (
      formData.designation === "Other" &&
      !formData.otherDesignation?.trim()
    ) {
      newErrors.otherDesignation = "Please specify the designation.";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSave(); // formData is already updated via setFormData
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[90vw] max-w-md shadow-lg space-y-4">
        <h2 className="text-xl font-semibold">
          {mode === "edit" ? "Edit Member" : "Add New Member"}
        </h2>

        {/* Full Name */}
        <div>
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">E-Mail</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Mobile Number
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value="+248"
              disabled
              className="w-16 border rounded px-3 py-2 text-sm bg-gray-100"
            />
            <input
              name="mobile"
              type="text"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="7-digit number"
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
          </div>
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 text-sm font-medium">Gender</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === "M"}
                onChange={handleChange}
              />
              Male
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === "F"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </div>

        {/* DOB */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Date Of Birth
          </label>
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        {/* Designation */}
        <div>
          <label className="block mb-1 text-sm font-medium">Designation</label>
          <select
            name="designation"
            value={formData.designation || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="">Select Designation</option>
            <option value="President">President</option>
            <option value="Vice-President">Vice-President</option>
            <option value="Treasurer">Treasurer</option>
            <option value="Secretary">Secretary</option>
            <option value="Member">Member</option>
            <option value="Other">Other</option>
          </select>
          {errors.designation && (
            <p className="text-red-500 text-sm">{errors.designation}</p>
          )}
        </div>

        {/* Other Designation Text Input */}
        {formData.designation === "Other" && (
          <div>
            <label className="block mb-1 text-sm font-medium">
              Other Designation
            </label>
            <input
              name="otherDesignation"
              type="text"
              value={formData.otherDesignation || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
            {errors.otherDesignation && (
              <p className="text-red-500 text-sm">{errors.otherDesignation}</p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded bg-[#F48F0F] text-white hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
