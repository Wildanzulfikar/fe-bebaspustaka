
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Kiri: Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white relative overflow-hidden">
        <div className="absolute top-8 left-6 md:left-10 flex items-center gap-3 pl-2 md:pl-4 z-10">
          <img
            src="/logo-pnj.png"
            alt="Logo Bebas Pustaka"
            className="w-16 h-16 object-contain"
          />
          <span className="font-bold text-2xl text-gray-800">e <span className="font-normal">–</span> BebasPus</span>
        </div>
        <div className="relative z-10 w-full flex flex-col items-center">
          {children}
        </div>
      </div>
      {/* Kanan: Gambar */}
      <div className="hidden md:block w-1/2 h-screen sticky top-0">
        <img
          src="/authAsset.png"
          alt="auth-asset"
          className="object-cover w-full h-screen"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
