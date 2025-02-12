"use client";
import { useState, useEffect } from "react";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/authService";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="bg-white p-4 border-b border-gray-200 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-xl font-semibold"></span>

        <div className="flex justify-between items-center gap-4">
          {user && <span className="text-gray-800">{user.name}</span>}
          <button
            onClick={handleLogout}
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
