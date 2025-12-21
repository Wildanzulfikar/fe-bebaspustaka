import React from "react";
import SidebarApp from "./component/sidebar/SidebarApp";
import Navbar from "./component/navbar/NavbarApp";
import Brand from "./component/sidebar/Brand";
import UsersMain from "./component/Users/UsersMain";
import MainTenggat from "./component/tenggat_waktu/MainTenggat";
import MainLoan from "./component/loan/MainLoan";
import MainBebasPustaka from "./component/bebas_pustaka/MainBebasPustaka";
import MainKeterangan from "./component/Keterangan/MainKeterangan";
import LoanAktif from "./component/loan/LoanAktif";
import LoanRiwayat from "./component/loan/LoanRiwayat";
import { Toaster } from "react-hot-toast";
import MainAnalitic from "./component/analitic/MainAnalitic"
import Loan from "./component/loan/Loan"
import { getData } from "./component/sidebar/dataNavigation";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Login, Register } from "./component/Auth";

/* =======================
   LAYOUT (React Router v6)
   ======================= */
function Layout() {
  const backgroundMain = {
    backgroundImage: "url('/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh"
  }

  return (
    <div className="flex p-12" style={backgroundMain}>
      <div className="flex flex-col min-h-full w-80">
        <Brand />
        <SidebarApp />
      </div>

      <div className="flex flex-col w-full">
        <Navbar />
        <div className="flex bg-white h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/* =======================
   APP
   ======================= */
function App() {
  const datas = getData();

  const pagesMap = {
    Users: <UsersMain />,
    "Tenggat Waktu": <MainTenggat />,
    "Data Loan": <MainLoan />,
    "Bebas Pustaka": <MainBebasPustaka />,
    Analitycs: <MainAnalitic />,
    Analytics: <MainAnalitic />,
  };

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* MAIN LAYOUT */}
        <Route path="/" element={<Layout />}>
          {/* STATIC MENU ROUTES */}
          {datas.map((data) => {
            const path = data.teks.toLowerCase().replace(/ /g, "-");

            return (
              <Route
                key={path}
                path={path}
                element={pagesMap[data.teks] ?? <div>Page not found</div>}
              />
            );
          })}

          {/* DYNAMIC ROUTE */}
          <Route
            path="edit-keterangan/:member_id"
            element={<MainKeterangan />}
          />
          <Route
            path="/loan/:nim/riwayat"
            element={<LoanRiwayat />}
          />
          <Route
            path="/loan/:nim/aktif"
            element={<LoanAktif />}
          />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
