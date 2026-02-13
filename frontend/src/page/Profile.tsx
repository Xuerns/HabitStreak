import React, { useEffect, useState } from "react";
import { fetchApi } from "../service/fetchApi";
import { useNavigate } from "react-router-dom";

interface User {
  NAME: string;
  gmail: string;
}

export default function Profile() {
  const [datas, setDatas] = useState<User | null>(null);
  const navigate = useNavigate();
  const handleProfile = async () => {
    try {
      const data = await fetchApi.getProfile();
      console.log(data);
      setDatas(data.user);
    } catch (err: any) {
      console.log(err.response?.data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
        navigate("/login")
        return
    }

    handleProfile();
  }, []);

  

  return (
    <div>
      <div>
        <p>{datas?.NAME}</p>
        <p>{datas?.gmail}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
