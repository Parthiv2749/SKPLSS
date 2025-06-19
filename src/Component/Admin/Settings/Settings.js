

import React, { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import SidebarLayout from "../reusable/SidebarLayout";
import CustomTable from "../reusable/CustomTable";
import DeleteConfirmation from "../reusable/DeleteConfirmation";
import AddRoleModal from "../reusable/AddRoleModal";
import EditUserModal from "../reusable/EditUserModal";

const currentUser = { id: 1, name: "Yagnik", role: "admin" }; // Replace with auth context later
const initialRoles = [
  {
    id: "admin",
    name: "Admin",
    permissions: {
      events: { view: true, add: true, edit: true, delete: true },
      gallery: { view: true, add: true, edit: true, delete: false },
      members: { view: true, add: true, edit: true, delete: false },
    },
  },
  {
    id: "editor",
    name: "Editor",
    permissions: {
      events: { view: true, add: true, edit: false, delete: false },
      gallery: { view: true, add: true, edit: false, delete: false },
      members: { view: true, add: false, edit: false, delete: false },
    },
  },
];

const initialUsers = [
  { id: 1, name: "Yagnik", email: "yagnik@example.com", role: "admin" },
];

const Settings = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [users, setUsers] = useState(initialUsers);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleDelete = () => {
    if (!itemToDelete) return;
    if (itemToDelete.role) {
      setUsers((prev) => prev.filter((u) => u.id !== itemToDelete.id));
    } else {
      setRoles((prev) => prev.filter((r) => r.id !== itemToDelete.id));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const roleCols = [
    {
      key: "name",
      label: "Role Name",
    },
    {
      key: "modules",
      label: "Modules Access",
      render: (_, row) =>
        Object.entries(row.permissions)
          .filter(([, perms]) => Object.values(perms).some(Boolean))
          .map(([mod]) => mod.charAt(0).toUpperCase() + mod.slice(1))
          .join(", "),
    },
  ];

  const userCols = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];


  if (currentUser?.role !== "admin") {
    return (
      <SidebarLayout>
        <div className="p-6 text-center text-gray-600 text-lg">
          ⚠️ You do not have permission to access this page.
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="p-4 sm:p-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#292929]">Settings</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage roles and user access.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1 px-4 py-2 border border-[#F48F0F] text-[#F48F0F] bg-white hover:bg-[#fff4e0] rounded-lg text-sm shadow-sm"
              onClick={() => setShowRoleModal(true)}
            >
              <Plus size={16} /> Add Type
            </button>
            <button
              className="flex items-center gap-1 px-4 py-2 bg-[#F48F0F] text-white hover:bg-[#dc7d00] rounded-lg text-sm shadow-sm"
              onClick={() => setShowEditUserModal(true)}
            >
              <Plus size={16} /> Add User
            </button>
          </div>
        </div>

        {/* Roles Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#292929]">Roles</h3>
          <CustomTable
            cols={roleCols}
            rows={roles.map((role) => ({
              ...role,
              actions:
                role.id === "admin" ? (
                  <span className="text-gray-400 italic text-sm">
                    Protected
                  </span>
                ) : (
                  <>
                    <button
                      className="text-[#F48F0F] flex items-center text-sm"
                      onClick={() => {
                        setSelectedRole(role);
                        setShowRoleModal(true);
                      }}
                    >
                      <Pencil size={14} className="mr-1" />
                    </button>
                    <button
                      className="text-red-500 flex items-center text-sm"
                      onClick={() => {
                        setItemToDelete(role);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash2 size={14} className="mr-1" />
                    </button>
                  </>
                ),
            }))}
          />
        </section>

        {/* Users Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#292929]">Users</h3>
          <CustomTable
            cols={userCols}
            rows={users.map((user) => ({
              ...user,
              actions: (
                <>
                  <button
                    className="text-[#F48F0F] hover:underline flex items-center text-sm"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditUserModal(true);
                    }}
                  >
                    <Pencil size={14} className="mr-1" />
                  </button>
                  <button
                    className="text-red-500 hover:underline flex items-center text-sm"
                    onClick={() => {
                      setItemToDelete(user);
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash2 size={14} className="mr-1" />
                  </button>
                </>
              ),
            }))}
          />
        </section>

        {/* Add Role Modal */}
        {showRoleModal && (
          <AddRoleModal
            role={selectedRole}
            onClose={() => {
              setShowRoleModal(false);
              setSelectedRole(null);
            }}
            onSave={(newRole) => {
              if (selectedRole) {
                setRoles((prev) =>
                  prev.map((r) => (r.id === newRole.id ? newRole : r))
                );
              } else {
                setRoles([...roles, newRole]);
              }
              setShowRoleModal(false);
              setSelectedRole(null);
            }}
          />
        )}

        {/* Edit User Modal */}
        {showEditUserModal && (
          <EditUserModal
            user={selectedUser}
            roles={roles} // ✅ Send roles to show dropdown
            onClose={() => {
              setShowEditUserModal(false);
              setSelectedUser(null);
            }}
            onSave={(updatedUser) => {
              if (selectedUser) {
                setUsers((prev) =>
                  prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
                );
              } else {
                setUsers((prev) => [...prev, updatedUser]);
              }
              setShowEditUserModal(false);
              setSelectedUser(null);
            }}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <DeleteConfirmation
            title="Confirm Deletion"
            message="Are you sure you want to delete this item?"
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </SidebarLayout>
  );
};

export default Settings;
