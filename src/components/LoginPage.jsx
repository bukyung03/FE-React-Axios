import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginForm() {
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrmsg(""); //에러 메시지 초기화

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: email,
        password: password
      }, {
        headers: {
          "x-api-key": "reqres-free-v1"
        }
      });

      const {token} = response.data;
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);
      navigate("/userlist");
    }

    //axios 요청 실패시
    catch (error) {
      //응답은 있지만 에러코드를 보낼때 && 서버가 준 응답 본문 && "user not found"
      if (error.response && error.response.data && error.response.data.error) {
        setErrmsg(error.response.data.error);
      }
      else {
        setErrmsg("user not found");
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-container">
      <h2>🔐 로그인</h2>
      <input type="text" placeholder="이메일" value={email} onChange={(e)=> setEmail(e.target.value)} required />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
      <button type="submit">로그인</button>
      {errmsg && <p>❌ {errmsg}</p>}
    </form>
  );
}
export default LoginForm;
