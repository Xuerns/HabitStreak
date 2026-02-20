import { fetchApi } from "../service/fetchApi";
import { useNavigate } from "react-router-dom";
import Bg_register from "../assets/BG_Register.png";
import AuthForm from "../components/AuthForm";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (data: {
    name?: string;
    gmail: string;
    password: string;
  }) => {
    try {
      const res = await fetchApi.register(
        data as { name: string; gmail: string; password: string },
      );
      console.log("Data:", res);
      alert("Berhasil Register boss");
      navigate("/auth/login");
    } catch (err: any) {
      console.log(err.response?.data);
      alert("Gagal register");
    }
  };

  return (
    <div
      className="flex h-screen justify-center items-center bg-cover"
      style={{ backgroundImage: `url(${Bg_register})` }}
    >
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
}
