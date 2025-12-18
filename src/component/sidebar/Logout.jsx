import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Panggil endpoint logout server (optional)
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Kalau JWT disimpan di localStorage atau cookie
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      // Hapus JWT di client
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      toast.success(data.message || "Logout berhasil!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`flex items-center justify-center gap-2 p-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-b-md w-full ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <div className="w-8">
          <img src="/logout.png" alt="logout" />
        </div>
        <div className="text-white font-semibold text-xl">
          {loading ? "Logging out..." : "Logout"}
        </div>
      </button>
    </>
  );
}

export default Logout;
