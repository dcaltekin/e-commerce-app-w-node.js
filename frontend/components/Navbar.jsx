import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [cartItemCount, setCartItemCount] = useState(2);

  const addItemToCart = () => {
    setCartItemCount(cartItemCount + 1);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Ana Sayfa</h1>
        <div className="relative flex items-center">
          <FaShoppingCart className="h-6 w-6 text-white" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {cartItemCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
