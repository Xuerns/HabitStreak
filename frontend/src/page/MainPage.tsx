import { useEffect } from "react";
import { fetchApi } from "../service/fetchApi";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useUsersStore } from "../hooks/useUsersStore";

export default function Profile() {
  const {name, setUser, clearUser} = useUsersStore()
  const navigate = useNavigate();

  // Get Profile
  const handleProfile = async () => {
    try {
      const data = await fetchApi.getProfile();
      setUser(data.user.NAME, data.user.gmail)
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
    clearUser()
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
            <h6 className="font-medium">{name || "Loading.."}</h6>
            <div className="h-10 w-10 rounded-full bg-amber-200"></div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
