import { useState } from "react";
import { fetchApi } from "../service/fetchApi";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const data = await fetchApi.register({ name, gmail, password });
      console.log("Data:", data);
      alert("Gello Berhasil Register boss");
    } catch (err: any) {
      console.log(err.response?.data);
      alert("Noooo gagal");
    }
  };

  return (
    <div>
      <label htmlFor="">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="">Gmail</label>
      <input
        type="email"
        value={gmail}
        onChange={(e) => setGmail(e.target.value)}
      />
      <label htmlFor="">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
