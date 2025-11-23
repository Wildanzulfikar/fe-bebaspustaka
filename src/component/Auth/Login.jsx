import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaptchaChange = (token) => {
    setIsCaptchaVerified(!!token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      alert("Silakan verifikasi captcha terlebih dahulu.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        })
      });
      const data = await res.json();
      if (res.ok && data.success !== false) {
        navigate("/analytics");
      } else {
        alert(data.message || "Login gagal!");
      }
    } catch (err) {
      alert("Terjadi error saat login!");
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center min-h-[90vh] w-full">
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-100 pt-0 pb-8 mt-24 md:mt-32 py-32">
          {/* Header */}
          <div className="rounded-t-xl rounded-b-none w-full pt-8 pb-6 text-center mb-6" style={{ backgroundColor: '#008797' }}>
            <h2 className="text-4xl font-bold text-white mb-2">Selamat Datang</h2>
            <p className="text-white text-base leading-tight">Masukkan Email dan Password Anda Untuk Mengakses.</p>
          </div>
          {/* Form Fields */}
          <div className="px-12">
            <div className="mb-4">
              <label className="block mb-1 font-medium text-lg">Username</label>
              <input type="text" name="username" value={form.username} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium text-lg">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <div className="mb-4 text-left">
              <a href="#" className="text-base text-blue-700 hover:underline">Lupa Password?</a>
            </div>
            <div className="flex items-center mb-6 w-full justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LfuJBYsAAAAACXwtQbVKNyh6ImUNzZJZieFFL2X"
                onChange={handleCaptchaChange}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-xl mb-4 shadow-sm hover:bg-blue-700 transition" disabled={!isCaptchaVerified}>Log in</button>
            <p className="text-center text-base">Belum Memiliki Akun? <a href="/register" className="text-blue-700 font-semibold">Register Now.</a></p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
