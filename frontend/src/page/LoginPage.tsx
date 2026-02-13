import { useEffect, useState } from "react";
import { fetchApi } from "../service/fetchApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const data = await fetchApi.login({ gmail, password });
      console.log("data:", data);
      alert("Berhasil login mas");
      navigate("/profile")
    } catch (err) {
      console.log(err);
      alert("Shit gagal login");
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("token")
    if (isLogin) {
        navigate("/profile")
    }
  }, [navigate])

  return (
    <div>
      <label htmlFor="">Gmail</label>
      <input type="email" value={gmail} onChange={(e) => setGmail(e.target.value)}/>
      <label htmlFor="">Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
