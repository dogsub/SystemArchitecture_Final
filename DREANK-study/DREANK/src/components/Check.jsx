import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";

export default function Check() {
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
        약관 확인
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
       내용이 쭉
      </Card>
    </Box>
  );
}
