import { useEffect } from "react";
import { fetchApi } from "../service/fetchApi";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useUsersStore } from "../hooks/useUsersStore";

export default function Profile() {
  const { setUser, clearUser } = useUsersStore();
  const navigate = useNavigate();

  // Get Profile
  const handleProfile = async () => {
    try {
      const data = await fetchApi.getProfile();
      setUser(data.user.NAME, data.user.gmail);
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
    clearUser();
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
    <div className="h-screen flex p-1.5 gap-1.5 bg-[#f5f3ef] overflow-hidden">
      <SideBar handleLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Page Content (Header removed since profile is in sidebar) */}
        <div className="flex-1 flex flex-col overflow-y-auto px-2 sm:px-3 md:px-4 py-4 w-full h-full relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
