import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";

const posts = [
  {
    title: "오늘 토익 어땠음?",
    content: "오늘 토익 시험 보신 분들 어땠음? LC 파트에서 새로운 유형의 문제가 나와서 많이 놓친듯 RC 파트는 시간 배분이 어려워서 끝까지 다 풀지 못한 게 아쉽네요. 혹시 시험 보신 분들 중에 이번 시험에서 어떤 부분이 가장 어려웠는지, 또 어떤 유형의 문제가 많이 나왔는지 공유해주실 수 있나요? 그리고 다음 시험을 준비하시는 분들을 위해 공부 팁이나 추천 자료도 공유해주시면 좋을 것 같아요! 다들 수고 많으셨고, 좋은 결과 있길 바랍니다! 감사합니다.",
    date: "05/10",
    likes: 2,
  },
  {
    title: "네이버 서합했습니다!",
    content: "네이버 서류 합격했네요, 아직 면접이랑 많이 남았지만 기분은 아주 좋습니다! 제 스펙 궁금하신 분들 댓글 달아주시면 답변드리겠습니다~~",
    date: "05/24",
    likes: 18,
  },
];

// Function to truncate text to 50 characters
function truncateText(text, length = 50) {
    return text.length > length ? text.substring(0, length) + "..." : text;
  }

export default function Posts() {
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
        sx={{ mb: 4, color: "#334EAC", fontWeight: "bold", fontSize: 30 }}
      >
        게시물 관리
      </Typography>

      {posts.map((post, index) => (
        <Card
          key={index}
          sx={{
            mb: 2,
            p: 2,
            boxShadow: 1,
            border: "1px solid #e0e0e0",
            width: "600px",
            textAlign: 'left' // Ensure text aligns left
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: 18, textAlign: 'left' }}>
            {post.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 1, color: "#666", textAlign: 'left' }}>
            {truncateText(post.content)}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontSize: 14, color: "#888" }}>
              {post.date} | 좋아요 {post.likes}
            </Typography>
            <Button variant="plane" sx={{ color: "primary.main" }}>
              자세히 보기
            </Button>
          </Stack>
        </Card>
      ))}
    </Box>
  );
}
