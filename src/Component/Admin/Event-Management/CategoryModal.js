import React, { useState, useEffect, useRef } from "react";

const CategoryModal = ({ category, onSave, onClose }) => {
  const [name, setName] = useState(category?.name || "");
  const modalRef = useRef();

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({
      id: category?.id || name.toLowerCase().replace(/\s+/g, "_"),
      name,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4"
      onMouseDown={(e) => {
        if (!modalRef.current?.contains(e.target)) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h3 className="text-lg font-semibold">
          {category ? "Edit Category" : "Add Category"}
        </h3>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded text-sm"
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-1 text-gray-700 border rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 bg-[#F48F0F] text-white rounded"
            onClick={handleSubmit}
          >
            {category ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
