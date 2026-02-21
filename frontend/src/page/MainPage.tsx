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

  // Get Profile
  const handleProfile = async () => {
    try {
      const data = await fetchApi.getProfile();
      console.log(data);
      setDatas(data.user);
    } catch (err: any) {
      console.log(err.response?.data);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
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
    <div className="h-screen flex p-1">
      <SideBar
        handleLogout={handleLogout}
      />
      <div className="px-2 w-full">
        <div className="flex items-center justify-end shadow-sm shadow-black/30 py-0.5">
          <div className="flex items-center gap-2 px-3 py-1 rounded">
            <h6 className="font-medium">{datas?.NAME}</h6>
            <div className="h-10 w-10 rounded-full bg-amber-200"></div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
