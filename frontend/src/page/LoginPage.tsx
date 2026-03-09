import { useEffect, useState } from "react";
import { fetchApi } from "../service/fetchApi";
import { useNavigate } from "react-router-dom";
import Bg_login from "../assets/BG_Login.png";
import AuthForm from "../components/AuthForm";
import { AuthFeedback } from "@/components/feedback/AuthFeedback";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isfeedback, setIsFeedback] = useState<"error" | "succes" | "">("");
  const [feedback, setFeedback] = useState({
    title: "",
    message: "",
  });
  const handleLogin = async (data: { gmail: string; password: string }) => {
    try {
      setIsLoading(true);
      const res = await fetchApi.login(data);
      setIsFeedback("succes");
      setFeedback({
        title: res.titleMessage,
        message: res.message,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err: any) {
      setIsLoading(false);
      setIsFeedback("error");
      setFeedback({
        title: err.response?.data?.titleMessage,
        message: err.response?.data?.message,
      });
      console.log(err);
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
      <div className="absolute top-5 overflow-hidden">
        {isfeedback != "" && <AuthFeedback title={feedback.title} message={feedback.message} type={isfeedback}/>}
      </div>

      <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading}/>
    </div>
  );
}
