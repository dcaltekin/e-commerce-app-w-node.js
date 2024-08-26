import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useToken } from "@/context/TokenContext";

export default function Sidebar() {
  const { token, logout } = useToken();
  const [isOpen, setIsOpen] = useState(false);
  console.log(token);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 w-64 p-5`}
      >
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">My Sidebar</h1>
        </div>
        <ul>
          <li className="mb-2">
            <a
              href="/dashboard"
              className="hover:bg-gray-700 p-2 block rounded"
            >
              Ana sayfa
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:bg-gray-700 p-2 block rounded">
              Ürünler
            </a>
          </li>
          <li className="mb-2">
            <button
              onClick={handleLogout}
              href="#"
              className="hover:bg-gray-700 p-2 block rounded"
            >
              Çıkış Yap
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6 lg:ml-64">
        <button
          className="lg:hidden mb-4 text-gray-800"
          onClick={toggleSidebar}
        >
          <FaBars size={24} />
        </button>
        <h1 className="text-3xl font-bold">Page Content</h1>
        <p>{token}</p>
      </div>
    </div>
  );
}
