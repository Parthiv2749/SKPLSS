import React, { useState } from "react";
import Back from "../../UI/Back_button/Back";

const MembershipForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileCode: "",
    mobileNumber: "",
    gender: "",
    dob: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Membership form submitted!");
    // Add actual form submission logic here
  };

  return (
    <>
      <div className=" bg-[#FDF8F3] items-left justify-left ">
        <Back />
      </div>
      <div className="min-h-fill bg-[#FDF8F3] flex flex-col items-center justify-center px-4 pb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#292929] mb-2">
          Become A Member
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Join our community and be part of something meaningful.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-2xl px-6 py-8 w-full max-w-md space-y-5"
        >
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F48F0F]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F48F0F]"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                name="mobileCode"
                placeholder="+91"
                value={form.mobileCode}
                onChange={handleChange}
                required
                className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F48F0F]"
              />
              <input
                type="tel"
                name="mobileNumber"
                value={form.mobileNumber}
                onChange={handleChange}
                required
                className="w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F48F0F]"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Date Of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F48F0F]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#F48F0F] hover:bg-[#e1810c] text-white font-semibold w-full py-3 rounded-lg transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default MembershipForm;
