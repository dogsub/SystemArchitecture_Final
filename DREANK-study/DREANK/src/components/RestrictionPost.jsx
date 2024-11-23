import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";

// Sample data for usage restrictions
const restrictions = [
  {
    date: "2023-09-15",
    reason: "Unauthorized access attempt",
  },
  {
    date: "2023-08-22",
    reason: "Excessive login failures",
  }
];

export default function RejectionPost() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#FFFFFF",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#334EAC",
          fontWeight: "bold",
          fontSize: 30
        }}
      >
        이용 제한 내역
      </Typography>

      <Card
        sx={{
          mb: 3,
          p: 3,
          boxShadow: 2,
          border: "1px solid #e0e0e0",
          width: "600px",
          borderRadius: "16px" // Rounded corners for better visual appeal
        }}
      >
        <Stack spacing={2} sx={{ mt: 2 }}>
          {restrictions.length > 0 ? (
            restrictions.map((restriction, index) => (
              <Box key={index} sx={{ width: '100%' }}>
                <Typography sx={{ fontSize: 16, color: "#333", fontWeight: 'medium' }}>
                  {restriction.date}
                </Typography>
                <Typography sx={{ fontSize: 16, color: "#666" }}>
                  {restriction.reason}
                </Typography>
                {index < restrictions.length - 1 && <Divider sx={{mt: 2, mb: 2}}/>}  {/* Only add Divider if not the last item */}
              </Box>
            ))
          ) : (
            <Typography sx={{ fontSize: 16, textAlign: 'center' }}>
              이용 제한 내역이 없습니다.
            </Typography>
          )}
        </Stack>
      </Card>
    </Box>
  );
}
