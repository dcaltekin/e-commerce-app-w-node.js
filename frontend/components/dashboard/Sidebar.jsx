import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useToken } from "@/context/TokenContext";
import Link from "next/link";

export default function Sidebar() {
  const { logout } = useToken();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full z-50 bg-gray-800 text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 w-64 p-5`}
      >
        <div className="mb-4 flex justify-between">
          <Link href="/" className="text-2xl font-semibold">
            Ana sayfa
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white lg:hidden"
          >
            X
          </button>
        </div>
        <ul>
          <li className="mb-2">
            <Link
              href="/dashboard"
              className="hover:bg-gray-700 p-2 block rounded"
            >
              Ürünler
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/top-selling"
              className="hover:bg-gray-700 p-2 block rounded"
            >
              En Çok Satan Ürünler
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/orders"
              className="hover:bg-gray-700 p-2 block rounded"
            >
              Siparişler
            </Link>
          </li>
          <li className="mb-2 ">
            <button
              onClick={handleLogout}
              className="hover:bg-gray-700 p-2 rounded block w-full text-start"
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
        {/* <h1 className="text-3xl font-bold">Token</h1>
        <p>{token}</p> */}
      </div>
    </div>
  );
}
