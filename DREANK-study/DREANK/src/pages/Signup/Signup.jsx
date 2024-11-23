import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as t from "./styles";
import instance from "../../shared/Request";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 중복 클릭 방지
  const [termsError, setTermsError] = useState("");  // 약관 동의 에러 메시지
  const [nicknameError, setNicknameError] = useState(""); // 닉네임 중복 에러
  const navigate = useNavigate();
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false); // 선택 약관 체크 상태

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleCheckboxChange3 = () => {
    setIsChecked3(!isChecked3);
  };

  const handleNameChange = async (value) => {
    setName(value);
    if (value.trim() === "") {
      setNameError("닉네임을 입력해주세요!");
      setNicknameError("");
    } else {
      setNameError("");
      // 닉네임 중복 확인 API 호출
      try {
        const response = await instance.get(`/user/check-nickname?nickname=${value}`);
        if (response.data.exists) {
          setNicknameError("이미 사용 중인 닉네임입니다.");
        } else {
          setNicknameError("");
        }
      } catch (error) {
        console.error("닉네임 중복 확인 실패:", error);
        setNicknameError("서버 오류가 발생했습니다.");
      }
    }
  };

  const handleEmailChange = async (value) => {
    setEmail(value);
    if (value.trim() === "") {
      setEmailError("이메일을 입력해주세요!");
    } else if (!validateEmail(value)) {
      setEmailError("이메일 양식에 맞게 다시 입력해주세요!");
    } else {
      setEmailError("");
      // 이메일 중복 확인 API 호출
      try {
        const response = await instance.get(`/user/check-email?email=${value}`);
        if (response.data.exists) {
          setEmailError("이미 가입된 이메일입니다.");
        } else {
          setEmailError("");
        }
      } catch (error) {
        console.error("이메일 중복 확인 실패:", error);
        setEmailError("서버 오류가 발생했습니다.");
      }
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!phoneRegex.test(value)) {
      setPhoneError("전화번호 형식이 맞지 않습니다.");
    } else {
      setPhoneError("");
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value.trim() === "") {
      setPasswordError("비밀번호를 입력해주세요!");
    } else if (value.length < 4) {
      setPasswordError("최소 4자리 이상 입력해주세요.");
    } else if (value.length > 12) {
      setPasswordError("최대 12자리까지 입력 가능합니다.");
    } else if (
        !/[a-zA-Z]/.test(value) ||
        !/\d/.test(value) ||
        !/[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(value)
    ) {
      setPasswordError("영어, 숫자, 특수문자를 모두 포함해주세요.");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordCheckChange = (value) => {
    setPasswordCheck(value);
    if (value.trim() !== password.trim()) {
      setPasswordCheckError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordCheckError("");
    }
  };

  const handleIntroductionChange = (value) => {
    setIntroduce(value);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    if (
        nameError ||
        emailError ||
        phoneError ||
        passwordError ||
        passwordCheckError ||
        nicknameError
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [nameError, emailError, phoneError, passwordError, passwordCheckError, nicknameError]);

  const handleJoin = async () => {
    // 약관 동의 체크
    if (!isChecked1 || !isChecked2) {
      setTermsError("필수 약관에 동의해야 회원가입이 가능합니다.");
      return;
    }
    setTermsError("");  // 약관 에러 초기화

    if (!isValid) {
      alert("입력한 정보를 다시 확인해주세요.");
      return;
    }

    if (isLoading) return;  // 중복 클릭 방지
    setIsLoading(true);

    try {
      const response = await instance.post("/user", {
        nickname: name,
        email,
        phone,
        password,
        introduce,
      });

      if (response.status === 201) {
        alert("회원가입에 성공하였습니다!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error response:", error.response); // 에러 응답 전체 출력

      // 서버에서 반환된 에러 메시지 처리
      if (error.response && error.response.data) {
        const errorMessage = error.response.data || error.response.data.error?.message;
        if (errorMessage && errorMessage.includes("이미 가입된 이메일")) {
          setEmailError("이미 가입된 이메일입니다.");
        } else if (errorMessage && errorMessage.includes("이미 사용 중인 닉네임")) {
          setNicknameError("이미 사용 중인 닉네임입니다.");
        } else {
          alert(`회원가입 실패: ${errorMessage || '서버 오류'}`);
        }
      } else {
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false); // 중복 클릭 방지 해제
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
      <t.Container>
        <t.Title>
          <h3>회원가입</h3>
        </t.Title>
        <t.InputContainer>
          <input
              id="name_input"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="닉네임을 입력해주세요"
          />
          <div className="error">{nameError}</div>
          <div className="error">{nicknameError}</div>
        </t.InputContainer>
        <t.InputContainer>
          <input
              id="info_email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="이메일을 입력해주세요"
          />
          <div className="error">{emailError}</div>
        </t.InputContainer>
        <t.InputContainer>
          <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="전화번호를 입력해주세요"
          />
          <div className="error">{phoneError}</div>
        </t.InputContainer>
        <t.InputContainer>
          <input
              id="info_password"
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
          />
          <div className="error">{passwordError}</div>
        </t.InputContainer>
        <t.InputContainer>
          <input
              id="info_password_check"
              type="password"
              value={passwordCheck}
              onChange={(e) => handlePasswordCheckChange(e.target.value)}
              placeholder="비밀번호 확인"
          />
          <div className="error">{passwordCheckError}</div>
        </t.InputContainer>
        <t.InputContainer2>
          <input
              id="info_introduction"
              type="text"
              value={introduce}
              onChange={(e) => handleIntroductionChange(e.target.value)}
              placeholder="소개글을 작성해주세요"
          />
        </t.InputContainer2>

        <t.Button
            id="joinBtn"
            onClick={handleJoin}
            isValid={isValid}
            disabled={false}
            style={{
              opacity: !isValid || isLoading ? 0.5 : 1,
              pointerEvents: isLoading ? 'none' : 'auto',
            }}
        >
          {isLoading ? "가입 중..." : "회원가입"}
        </t.Button>

        {termsError && (
            <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "5px",
                  textAlign: "center"
                }}
            >
              {termsError}
            </div>
        )}

        <t.BottomLinksContainer>
          <t.BottomLink>이미 계정이 있나요?</t.BottomLink>
          <t.BottomLink>
            <t.LoginLink onClick={handleLoginRedirect}>
              로그인 페이지로 이동하기
            </t.LoginLink>
          </t.BottomLink>
        </t.BottomLinksContainer>

        <t.ContractContainer>
          <t.ContractText>제 1장. 회원가입 약관 및 총칙</t.ContractText>
          <t.TermsBox>
            <p>
              <strong>제 1조 (목적)</strong><br/>
              본 약관은 사용자가 회원가입 시 약관에 동의함을 기반으로 하여,
              제공되는 모든 서비스의 이용에 관하여 필요한 사항을 규정하는 것을 목적으로 합니다.
              <br/><br/>
              <strong>제 2조 (서비스 이용)</strong><br/>
              회원은 회사가 제공하는 다양한 서비스에 대한 접근 권한을 가지며,
              서비스 제공 회사는 이에 필요한 정보를 요구할 수 있습니다.
              <br/><br/>
              <strong>제 3조 (회원의 의무)</strong><br/>
              회원은 본 약관을 준수하며, 타인의 권리나 개인정보를 침해하지 않을 의무를 가집니다.
              <br/><br/>
              기타 자세한 내용은 회사의 개인정보 보호 정책 및 서비스 이용 약관을 참고하시기 바랍니다.
            </p>
          </t.TermsBox>

          <t.CheckboxContainer>
            <t.Checkbox
                type="checkbox"
                id="agreement1"
                checked={isChecked1}
                onChange={handleCheckboxChange1}
            />
            <t.AgreementLabel htmlFor="agreement1">
              (필수) 회원가입 약관에 동의합니다.
            </t.AgreementLabel>
          </t.CheckboxContainer>

          <t.ContractText>제 2장. 서비스 및 활용 안내</t.ContractText>
          <t.TermsBox>
            <p>
              <strong>제 1조 (목적)</strong><br/>
              본 방침은 개인정보의 처리 및 보호를 위하여 필요한 사항을 규정하는 것을 목적으로 합니다.
              <br/><br/>
              <strong>제 2조 (개인정보 수집)</strong><br/>
              회사는 회원의 개인정보를 최소한으로 수집하며, 수집된 정보는 동의 없이 제3자에게 제공되지 않습니다.
              <br/><br/>
              기타 사항은 회사의 개인정보 처리방침을 참조하시기 바랍니다.
            </p>
          </t.TermsBox>

          <t.CheckboxContainer>
            <t.Checkbox
                type="checkbox"
                id="agreement2"
                checked={isChecked2}
                onChange={handleCheckboxChange2}
            />
            <t.AgreementLabel htmlFor="agreement2">
              (필수) 개인정보 처리방침에 동의합니다.
            </t.AgreementLabel>
          </t.CheckboxContainer>

          <t.ContractText>제 3장. 마케팅 정보 수신 동의 (선택)</t.ContractText>
          <t.TermsBox>
            <p>
              <strong>제 1조 (목적)</strong><br/>
              본 약관은 회원이 선택적으로 마케팅 정보를 수신하는 것에 대한 동의를 기반으로 하며,
              회사는 회원에게 다양한 혜택과 이벤트, 할인 정보를 제공할 수 있습니다.
              <br/><br/>
              <strong>제 2조 (수신 정보의 종류)</strong><br/>
              회원은 이메일, SMS, 앱 푸시 등의 수단을 통해 다음과 같은 정보를 수신할 수 있습니다:
              <ul>
                <li>이벤트 및 프로모션 정보</li>
                <li>할인 쿠폰 및 특별 혜택</li>
                <li>신규 서비스 및 제품 출시 안내</li>
              </ul>
              <br/>
              <strong>제 3조 (동의 철회)</strong><br/>
              회원은 언제든지 마케팅 정보 수신 동의를 철회할 수 있으며, 이는 회원의 권리로 보장됩니다.
              <br/><br/>
              <strong>제 4조 (개인정보 보호)</strong><br/>
              회사는 마케팅 정보 제공을 위해 수집된 개인정보를 철저히 보호하며, 회원의 동의 없이 제3자에게 제공하지 않습니다.
            </p>
          </t.TermsBox>

          <t.CheckboxContainer>
            <t.Checkbox
                type="checkbox"
                id="agreement3"
                checked={isChecked3}
                onChange={handleCheckboxChange3}
            />
            <t.AgreementLabel htmlFor="agreement3">
              (선택) 마케팅 정보 수신에 동의합니다.
            </t.AgreementLabel>
          </t.CheckboxContainer>
        </t.ContractContainer>
      </t.Container>
  );
};

export default Signup;
