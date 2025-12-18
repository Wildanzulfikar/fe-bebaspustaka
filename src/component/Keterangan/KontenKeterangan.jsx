import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function KontenKeterangan() {
  const { member_id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/mahasiswa-bebas-pustaka/${member_id}`)
      .then((res) => res.json())
      .then((result) => setData(result[0] || {}))
      .catch((err) => console.log(err));
  }, [member_id]);

  const submitKeterangan = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/bebas-pustaka/update", {
      method: "PUT",
      
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
       },
      body: JSON.stringify({
        kode_user: data.nim,
        keterangan,
      }),
    })
      .then(() => {
        alert("Keterangan berhasil disimpan!");
        navigate(-1);
      })
      .catch((err) => console.log(err));
      console.log("Submit kode_user:", data.nim, "Keterangan:", keterangan);
  };

  console.log(data)

  return (
    <div>
      <div className="flex h-68 gap-11 min-w-full p-4 rounded shadow-md">
        {data && (
          <div className="grid grid-cols-2 space-y-4 text-gray-600 w-full">
            <span className="font-medium">Nama</span>
            <span>{data.nama}</span>

            <span className="font-medium">Prodi</span>
            <span>{data.prodi}</span>

            <span className="font-medium">Kelas</span>
            <span>{data.kelas}</span>

            <span className="font-medium">Semester</span>
            <span>{data.semester}</span>

          </div>
        )}
      
        <div className="flex flex-col gap-4 w-full">
          <h1>Keterangan</h1>
          <textarea
            className="border border-gray-400 rounded-md h-40 w-full"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="flex gap-4 pt-4 text-white">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#FD5555] flex gap-2 items-center px-6 py-2 rounded-md"
        >
          <img src="/back.png" alt="kembali" /> Kembali
        </button>
        <button
          onClick={submitKeterangan}
          className="bg-[#1DAF7C] flex gap-2 items-center px-6 py-2 rounded-md"
        >
          <img src="/submit.png" alt="submit" /> Submit
        </button>
      </div>
    </div>
  );
}

export default KontenKeterangan;
