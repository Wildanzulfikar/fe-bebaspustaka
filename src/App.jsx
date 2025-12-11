import React from "react";
import SidebarApp from "./component/sidebar/SidebarApp";
import Navbar from "./component/navbar/NavbarApp";
import Brand from "./component/sidebar/Brand";
import UsersMain from "./component/Users/UsersMain";
import MainTenggat from "./component/tenggat_waktu/MainTenggat";
import MainLoan from "./component/loan/MainLoan";
import MainBebasPustaka from "./component/bebas_pustaka/MainBebasPustaka";
import MainKeterangan from "./component/Keterangan/MainKeterangan";
import { Toaster } from "react-hot-toast";
import { getData } from "./component/sidebar/dataNavigation";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Login, Register } from "./component/Auth";

function Layout({ children }) {
  const backgroundMain = {
    backgroundImage: "url('/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

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

function App() {
  const datas = getData();
  const pagesMap = {
    Users: <UsersMain />,
    "Tenggat Waktu": <MainTenggat />,
    "Data Loan": <MainLoan />,
    "Bebas Pustaka": <MainBebasPustaka />,
  };

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout route */}
        <Route path="/" element={<Layout />}>
          {/* Static pages */}
          {datas.map((data) => {
            const path = data.teks.toLowerCase().replace(/ /g, "-");
            return (
              <Route key={data.id} path={path} element={pagesMap[data.teks]} />
            );
          })}

          {/* Dynamic Keterangan page */}
          <Route path="edit-keterangan/:id" element={<MainKeterangan />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
