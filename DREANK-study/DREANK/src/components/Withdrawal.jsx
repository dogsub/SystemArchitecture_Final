import { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input"; // Import for text fields
import instance from "../shared/Request";
import { useNavigate } from "react-router-dom";

export default function Withdrawal() {
  const [withdrawalText, setWithdrawalText] = useState("");
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const handleWithdrawal = async () => {
    if (withdrawalText !== "탈퇴") {
      alert("탈퇴하려면 '탈퇴'라고 입력해주세요.");
      return;
    }

    try {
      const response = await instance.delete(`/user/${userId}`);
      if (response.status === 200) {
        alert("탈퇴되었습니다. 이용해주셔서 감사합니다.");
        localStorage.clear(); // 로컬 스토리지 비우기
        navigate("/"); // 홈 페이지로 이동
      }
    } catch (error) {
      console.error("탈퇴 중 오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#FFFFFF",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "#334EAC", fontWeight: "bold", fontSize: 30 }}
      >
        탈퇴
      </Typography>

      <Card
        sx={{
          mb: 3,
          p: 3,
          boxShadow: 0,
          border: "1px solid #e0e0e0",
          width: "500px",
        }}
      >
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Input
            label="탈퇴"
            type="text"
            placeholder="탈퇴"
            value={withdrawalText}
            onChange={(e) => setWithdrawalText(e.target.value)}
            required
            variant="outlined"
            fullWidth
          />
          <Typography sx={{ color: "#666", fontSize: 14, mt: 1 }}>
            ※ 탈퇴하면 일주일동안 재가입 불가, 되돌릴 수 없습니다. 동의하시면 탈퇴라고 작성후 탈퇴 버튼을 클릭해 주세요.
          </Typography>
          <Button variant="solid" sx={{ mt: 2 }} onClick={handleWithdrawal}>
            탈퇴
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
