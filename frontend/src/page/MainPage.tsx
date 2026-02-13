import { useEffect, useState } from "react";
import { fetchApi } from "../service/fetchApi";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

interface User {
  NAME: string;
  gmail: string;
}

export default function Profile() {
  const [datas, setDatas] = useState<User | null>(null);
  const navigate = useNavigate();

  // Api Call
  const handleProfile = async () => {
    try {
      const data = await fetchApi.getProfile();
      console.log(data);
      setDatas(data.user);
    } catch (err: any) {
      console.log(err.response?.data);
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        navigate("/auth/login");
      }
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  // token & call function
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/login");
      return;
    }

    handleProfile();
  }, []);

  return (
    <div className="h-screen flex">
      <SideBar
        handleLogout={handleLogout}
        datasName={datas?.NAME}
        datasGmail={datas?.gmail}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
