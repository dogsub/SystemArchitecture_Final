import * as t from "./styles";
import kakao from "../../assets/kakao.png";
import naver from "../../assets/naver.png";
import google from "../../assets/google.png";
import { useState } from "react";
import instance from "../../shared/Request";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await instance.post("/login", { email, password });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("nickname", response.data.nickname);
        localStorage.setItem("user_id", response.data.user_id);
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("로그인에 실패했습니다!");
    }
  };

  return (
    <t.Container>
      <t.Title>
        <h3>로그인</h3>
      </t.Title>
      <t.InputContainer>
        <input
          id="email_input"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </t.InputContainer>
      <t.InputContainer>
        <input
          id="password_input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </t.InputContainer>

      {/* 에러 메시지를 가운데 정렬하는 스타일 적용 */}
      <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>

      <t.Button id="loginBtn" onClick={handleLogin}>
        로그인
      </t.Button>
      <t.HorizontalLine />
      <t.SocialLoginButton>
        <img src={naver} alt="Naver Logo" />
        <span>Naver로 로그인</span>
      </t.SocialLoginButton>
      <t.SocialLoginButton3>
        <img src={kakao} alt="Kakao Logo" />
        <span>Kakao로 로그인</span>
      </t.SocialLoginButton3>
      <t.SocialLoginButton2>
        <img src={google} alt="Google Logo" />
        <span>Google로 로그인</span>
      </t.SocialLoginButton2>
    </t.Container>
  );
};

export default Login;
