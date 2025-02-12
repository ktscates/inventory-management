"use client";
import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import UserFormModal from "../../components/UserFormModal";
import { getUsers, deleteUser } from "@/services/userService";
import DefaultLayout from "@/components/DefaultLayout";
import { User } from "@/types/model";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<
    | {
        id: string;
        full_name: string;
        email: string;
        role: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersData = await getUsers();
    const filteredUsers = usersData.filter(
      (user) => user.role !== "Super Admin"
    );

    setUsers(filteredUsers);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleEdit = (user: {
    id: string;
    full_name: string;
    email: string;
    role: string;
  }) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const formattedDate = d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return `${formattedDate}`;
  };

  return (
    <DefaultLayout>
      <div className="p-6">
        <div className="flex text-gray-800 justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create User
          </button>
        </div>

        <Table
          data={users.map((user) => ({
            ...user,
            created_at: user.created_at ? formatDate(user.created_at) : "-",
          }))}
          columns={[
            { key: "full_name", label: "Full Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "created_at", label: "Created At" },
          ]}
          onEdit={handleEdit}
          onDelete={handleDelete}
          itemsPerPage={5}
        />

        {isModalOpen && (
          <UserFormModal
            onClose={() => setIsModalOpen(false)}
            onUserCreated={fetchUsers}
            userToEdit={selectedUser}
          />
        )}
      </div>
      {users.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No users found.</p>
      )}
    </DefaultLayout>
  );
};

export default UserManagement;
