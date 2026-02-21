import { useEffect } from "react";
import { fetchApi } from "../service/fetchApi";
import { useNavigate } from "react-router-dom";
import Bg_login from "../assets/BG_Login.png";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (data: { gmail: string; password: string }) => {
    try {
      const res = await fetchApi.login(data);
      console.log("data:", res);
      alert("Berhasil login mas");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Shit gagal login");
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("token");
    if (isLogin) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div
      className="flex h-screen justify-center items-center bg-cover"
      style={{ backgroundImage: `url(${Bg_login})` }}
    >
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
}
