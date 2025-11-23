import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import AuthLayout from "./AuthLayout";

const Register = () => {
  const [form, setForm] = useState({ username: "", name: "", email: "", password: "", confirm: "" });
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const recaptchaRef = useRef(null);

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          name: form.name,
          email: form.email,
          password: form.password,
          confirm: form.confirm
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Register berhasil! Silakan login.');
        window.location.href = '/login';
      } else {
        alert(data.message || 'Register gagal!');
      }
    } catch (err) {
      alert('Terjadi error saat register!');
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-100 pt-0 pb-8 mt-24 md:mt-32 py-32">
        {/* Header */}
        <div className="rounded-t-xl rounded-b-none w-full pt-8 pb-6 text-center mb-6" style={{ backgroundColor: '#008797' }}>
          <h2 className="text-4xl font-bold text-white mb-2">Register</h2>
          <p className="text-white text-base leading-tight">Masukkan Data Anda Dengan Lengkap Di bawah ini.</p>
        </div>
        <div className="px-12">
          <div className="mb-4">
            <label className="block mb-1 font-medium text-lg">Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-lg">Nama Lengkap</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-lg">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-lg">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-lg">Konfirmasi Password</label>
            <input type="password" name="confirm" value={form.confirm} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
          </div>
          <div className="flex items-center mb-6 w-full justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="YOUR_SITE_KEY"
              onChange={handleCaptchaChange}
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-xl mb-4 shadow-sm hover:bg-blue-700 transition" disabled={!isCaptchaVerified}>Register</button>
          <p className="text-center text-base">Sudah Memiliki Akun? <a href="/login" className="text-blue-700 font-semibold">Login Now.</a></p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
