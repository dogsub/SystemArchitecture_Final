import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input";
import instance from "../shared/Request";

export default function Password() {
  const userId = localStorage.getItem("user_id");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await instance.patch(`/user/${userId}/update`, {
        new_password: newPassword,
      });
      if (response.status === 200) {
        alert("Password has been updated successfully.");
        navigate("/mypage");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password. Please try again.");
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
        비밀번호 변경
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
            label="새 비밀번호"
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            variant="outlined"
            fullWidth
          />
          <Input
            label="새 비밀번호 확인"
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            fullWidth
          />
          <Typography sx={{ color: "#666", fontSize: 14, mt: 1 }}>
            ※ 새 비밀번호는 타인과 공유하지 마세요. 계정 안전을 위해 강력한 비밀번호를 사용하세요.
          </Typography>
          <Button variant="solid" sx={{ mt: 2 }} onClick={handleChangePassword}>
            비밀번호 변경
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
