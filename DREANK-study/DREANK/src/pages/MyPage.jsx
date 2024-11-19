import { useNavigate } from "react-router-dom";
import MyProfile from "../components/MyProfile";
import { Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import PasswordModal from "../components/PasswordModal";
import instance from "../shared/Request";

export default function MyPage() {
  const nickname = localStorage.getItem('nickname');
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(true);
  const isMounted = useRef(false); // 마운트 상태 관리

  useEffect(() => {
    if (!isMounted.current) {
      // 처음 마운트될 때만 실행
      isMounted.current = true;

      if (!nickname) {
        alert("로그인 후 이용해주세요!");
        navigate("/login");
      }
    }
  }, [nickname, navigate]);

  const handlePasswordSubmit = async (password) => {
    try {
      const response = await instance.post(`/user/${userId}/mypage`, { password });
      if (response.status === 200) {
        setPasswordModalOpen(false);
      } else {
        alert("비밀번호가 틀렸습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error("비밀번호 검증 중 오류 발생:", error);
      navigate("/");
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onRequestClose={() => navigate("/")}
        onSubmit={handlePasswordSubmit}
      />
      <Box component="main" className="MainContent" sx={{ flex: 1 }}>
        <MyProfile />
      </Box>
    </Box>
  );
}
