import { fetchApi } from "../service/fetchApi";
import { useNavigate } from "react-router-dom";
import Bg_register from "../assets/BG_Register.png";
import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { AuthFeedback } from "@/components/feedback/AuthFeedback";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isfeedback, setIsFeedback] = useState<"error" | "succes" | "">("");
  const [feedback, setFeedback] = useState({
    title: "",
    message: "",
  });
  const handleRegister = async (data: {
    name?: string;
    gmail: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const res = await fetchApi.register(
        data as { name: string; gmail: string; password: string },
      );
      setFeedback({
        title: res.titleMessage,
        message: res.message,
      })
      setIsFeedback("succes")
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err: any) {
      setIsLoading(false);
      setIsFeedback("error");
      console.log(err.response);
      setFeedback({
        title: err.response?.data?.titleMessage,
        message: err.response?.data?.message,
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsFeedback("");
        setFeedback({
          title: "",
          message: "",
        });
      }, 2000);
    }
  };

  return (
    <div
      className="flex h-screen justify-center items-center bg-cover"
      style={{ backgroundImage: `url(${Bg_register})` }}
    >
      <div className="absolute top-0 h-40 overflow-hidden">
        {isfeedback != "" && (
          <AuthFeedback message={feedback.message} title={feedback.title} type={isfeedback}/>
        )}
      </div>

      <AuthForm
        type="register"
        onSubmit={handleRegister}
        isLoading={isLoading}
      />
    </div>
  );
}
