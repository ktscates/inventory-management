"use client";
import { useEffect, useState } from "react";
import { getUserRole } from "@/services/authService";
import Link from "next/link";

const Sidebar = () => {
  const [role, setRole] = useState<
    "Inventory Manager" | "Program Manager" | "Super Admin" | null
  >(null);

  useEffect(() => {
    const fetchRole = async () => {
      const currentRole = await getUserRole();
      setRole(currentRole);
    };
    fetchRole();
  }, []);

  return (
    <div className="bg-blue-300 text-gray-800 w-64 p-4 min-h-screen">
      <ul>
        {(role === "Super Admin" || role === "Inventory Manager") && (
          <>
            <li>
              <Link legacyBehavior href="/user-management">
                <a className="block mt-24 py-2 px-4 hover:bg-blue-500 rounded">
                  User Management
                </a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/inventory">
                <a className="block py-2 px-4 hover:bg-blue-500 rounded">
                  Inventory
                </a>
              </Link>
            </li>
          </>
        )}
        {role === "Program Manager" && (
          <li>
            <Link legacyBehavior href="/dashboard">
              <a className="block mt-24 py-2 px-4 hover:bg-blue-500 rounded">
                Dashboard
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
