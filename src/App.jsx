import React from "react"
import SidebarApp from "./component/sidebar/SidebarApp"
import Navbar from "./component/navbar/NavbarApp"
import Brand from "./component/sidebar/Brand"
import UsersMain from "./component/Users/UsersMain"
import MainTenggat from "./component/tenggat_waktu/MainTenggat"
import Loan from "./component/loan/Loan"
import MainAnalitic from "./component/analitic/MainAnalitic"
import MainPengunjung from "./component/pengunjung/MainPengunjung";
import { getData } from "./component/sidebar/dataNavigation"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const backgroundMain = {
    backgroundImage : "url('/background.png')",
    backgroundSize: "cover",       
    backgroundPosition: "center",
    minHeight: "100vh"
  }

  const datas = getData();
  const pagesMap = {
    "Users": <UsersMain />,
    "Tenggat Waktu": <MainTenggat />,
    "Data Loan" : <Loan />,
    "Analitycs": <MainAnalitic />,
    "Pengunjung": <MainPengunjung /> 
  }

  return (
  <Router>
    <div className="flex p-12" style={backgroundMain}>
      <div className="flex flex-col min-h-full w-80">
        <Brand />
        <SidebarApp />
      </div>
      <div className="flex flex-col min-h-full w-full">
        <Navbar />
        <div className="">
            <Routes>
              {datas.map((data) => {
                const path = `/${data.teks.toLowerCase().replace(/ /g, "-")}`;
                return <Route key={data.id} path={path} element={pagesMap[data.teks]} />;
              })}
            </Routes>
          </div>
      </div>
    </div>
  </Router>
)
}

export default App