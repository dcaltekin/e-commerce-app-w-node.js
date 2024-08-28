import { useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/dashboard/Sidebar";
import { useToken } from "@/context/TokenContext";
import ProductLists from "@/components/dashboard/ProductLists";

export default function Dashboard() {
  const { token } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (token === null) {
      return;
    }
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return (
    token && (
      <div>
        <Sidebar />
        <div className="lg:ml-64 p-8">
          <ProductLists />
        </div>
      </div>
    )
  );
}
