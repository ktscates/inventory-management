"use client";
import { useEffect, useState } from "react";
import { createUserWithAuth, updateUser } from "@/services/userService";

interface UserFormModalProps {
  onClose: () => void;
  onUserCreated: () => void;
  userToEdit?: { id: string; full_name: string; email: string; role: string };
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  onClose,
  onUserCreated,
  userToEdit,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Inventory Manager" | "Program Manager">(
    "Inventory Manager"
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setFullName(userToEdit.full_name);
      setEmail(userToEdit.email);
      setRole(userToEdit.role as "Inventory Manager" | "Program Manager");
      setIsEditing(true);
    } else {
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("Inventory Manager");
      setIsEditing(false);
    }
  }, [userToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isEditing && userToEdit) {
      //Update existing user
      const result = await updateUser(userToEdit.id, {
        fullName,
        email,
        role,
      });

      if (result.success) {
        setMessage("User updated successfully!");
        onUserCreated();
        setTimeout(onClose, 1000);
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } else {
      //Create new user
      const result = await createUserWithAuth(email, password, fullName, role);

      if (result.success) {
        setMessage("User created successfully!");
        setFullName("");
        setEmail("");
        setPassword("");
        setRole("Inventory Manager");
        onUserCreated();
        setTimeout(onClose, 1000);
      } else {
        setMessage(`Error: ${result.message}`);
      }
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 text-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create User</h2>

        {message && (
          <p
            className={`text-center mb-2 ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value as "Inventory Manager" | "Program Manager"
                )
              }
              className="w-full p-2 border rounded"
            >
              <option value="Inventory Manager">Inventory Manager</option>
              <option value="Program Manager">Program Manager</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update"
                : "Create"}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
