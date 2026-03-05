import { useEffect, useState } from "react";
import { fetchApi } from "../service/fetchApi";
import { useNavigate } from "react-router-dom";
import Bg_login from "../assets/BG_Login.png";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (data: { gmail: string; password: string }) => {
    try {
      setIsLoading(true);
      const res = await fetchApi.login(data);
      console.log("data:", res);
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    } finally {
      setIsLoading(false);
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
      <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading}/>
    </div>
  );
}
