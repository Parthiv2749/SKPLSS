import React, { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import CustomTable from "../reusable/CustomTable";
import CategoryModal from "./CategoryModal";
import DeleteConfirmation from "../reusable/DeleteConfirmation";
import SidebarLayout from "../reusable/SidebarLayout";
import events from "../../../assets/eventsarray";
import initialCategories from "../../../assets/EventCategories";

const ManageCategories = () => {
  const [categoryList, setCategoryList] = useState(initialCategories);
  const [eventsList] = useState(events);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const handleSave = (cat) => {
    setCategoryList((prev) =>
      prev.some((c) => c.id === cat.id)
        ? prev.map((c) => (c.id === cat.id ? cat : c))
        : [...prev, cat]
    );
  };

  const handleDelete = () => {
    setCategoryList((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setShowDelete(false);
  };

  const handleViewEvents = (categoryId) => {
    const linked = eventsList.filter((e) => e.category === categoryId);
    if (linked.length === 0) {
      alert("No events linked with this category.");
    } else {
      alert("Linked Events:\n" + linked.map((e) => `- ${e.title}`).join("\n"));
    }
  };

  const categoryCols = [
    { key: "name", label: "Category" },
    {
      key: "eventCount",
      label: "Events",
      render: (_, row) =>
        eventsList.filter((e) => e.category === row.id).length,
    },
  ];

  return (
    <SidebarLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Manage Categories</h2>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setShowModal(true);
            }}
            className="px-4 py-2 bg-[#F48F0F] text-white rounded"
          >
            Add Category
          </button>
        </div>

        <CustomTable
          cols={categoryCols}
          rows={categoryList.map((row) => ({
            ...row,
            actions: (
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => handleViewEvents(row.id)}
                  className="text-blue-500 hover:scale-105 transition"
                  title="View Events"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(row);
                    setShowModal(true);
                  }}
                  className="text-[#F48F0F] hover:scale-105 transition"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => {
                    const isUsed = eventsList.some(
                      (e) => e.category === row.id
                    );
                    if (isUsed) {
                      alert("Can't delete, events are using this category.");
                    } else {
                      setDeleteTarget(row);
                      setShowDelete(true);
                    }
                  }}
                  className="text-red-500 hover:scale-105 transition"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ),
          }))}
        />

        {showModal && (
          <CategoryModal
            category={selectedCategory}
            onSave={(cat) => {
              handleSave(cat);
              setShowModal(false);
            }}
            onClose={() => setShowModal(false)}
          />
        )}

        {showDelete && (
          <DeleteConfirmation
            title="Delete Category"
            message={`Delete ${deleteTarget.name}? This action cannot be undone.`}
            onCancel={() => setShowDelete(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </SidebarLayout>
  );
};

export default ManageCategories;
