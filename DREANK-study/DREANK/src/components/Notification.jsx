import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input"; // Import for text fields

export default function Notification() {
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
            required
            variant="outlined"
            fullWidth
          />
          <Input
            label="새 비밀번호 확인"
            type="password"
            placeholder="새 비밀번호 확인"
            required
            variant="outlined"
            fullWidth
          />
          <Typography sx={{ color: "#666", fontSize: 14, mt: 1 }}>
            ※ 새 비밀번호에 제공을 약화하고 하시나요? dreank 이용약관에서는 타인이 제공 제반, 악운 및 만남 등을 적합하게 진행하고 있습니다. 모니터링 시스템에 의해 계정 악운가 작성된 경우에 게점은 운영 정지, 탈퇴 등의 조치가 가능하며, 계정 악동으로 인해 사기, 통계 허위가 발생한 경우 관련법에 따라 법적 책임을 지게 될 수 있습니다.
          </Typography>
          <Button variant="solid" sx={{ mt: 2 }}>
            비밀번호 변경
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
