import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import { Link } from "react-router-dom";
import { Avatar, FormControl, FormLabel, Input } from "@mui/joy";
import instance from "../shared/Request";

export default function MyProfile() {
  const userId = localStorage.getItem("user_id");
  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");
  const user_email = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get(`/user/${userId}`);
        const userData = response.data;
        setNickname(userData.nickname);
        setIntroduce(userData.introduce);
      } catch (error) {
        console.error("유저 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSave = async () => {
    try {
      const response = await instance.patch(`/user/${userId}/update`, {
        nickname,
        introduce,
      });
      if (response.status === 200) {
        alert("프로필이 업데이트되었습니다.");
      }
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
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
        sx={{ mb: 4, color: "black", fontWeight: "bold", fontSize: 30 }}
      >
        마이페이지
      </Typography>

      <Card
        sx={{
          mb: 3,
          p: 3,
          boxShadow: 0,
          border: "1px solid #e0e0e0",
          width: "700px",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ height: 80, width: 80 }} />

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <FormControl>
              <FormLabel sx={{ m: 1 }}>닉네임</FormLabel>
              <Input
                label="닉네임"
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                variant="outlined"
                sx={{ width: "50%", ml: 1 }}
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ m: 1 }}>한줄 소개</FormLabel>
              <Input
                label="한줄소개"
                type="text"
                placeholder="한줄 소개"
                value={introduce}
                onChange={(e) => setIntroduce(e.target.value)}
                required
                variant="outlined"
                sx={{ width: "100%", ml: 1, maxLines: 1 }}
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                mt: 2,
              }}
            >
              <Button sx={{backgroundColor: "#334EAC",}}onClick={handleSave}>저장</Button>
            </Box>
          </Box>
        </Stack>
      </Card>

      <Card
        sx={{
          mb: 3,
          p: 3,
          boxShadow: 0,
          border: "1px solid #e0e0e0",
          width: "700px",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          개인정보&문의
        </Typography>
        <Divider />
        <Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              disabled
              variant="text"
              sx={{ justifyContent: "flex-end", color: "#000" }}
            >
              아이디
            </Button>
            <Typography sx={{ color: "#666", fontSize: 15, mr: 2 }}>
              {user_email}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
            <Link
              to="/mypage/password"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              <Button variant="text">비밀번호 변경</Button>
            </Link>
          </Stack>
          <Divider />
          <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
            <Link
              to="/mypage/check"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              <Button variant="text">약관 확인</Button>
            </Link>
          </Stack>
        </Stack>
      </Card>

      <Card
        sx={{
          mb: 3,
          p: 3,
          boxShadow: 0,
          border: "1px solid #e0e0e0",
          width: "700px",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          스터디 관리
        </Typography>
        <Divider />
        <Stack>
          <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
            <Link
              to="/mypage/mystudy"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              <Button variant="text">내가 만든 스터디 관리</Button>
            </Link>
          </Stack>
          <Divider />
          <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
            <Link
              to="/mypage/study"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              <Button variant="text">가입한 스터디 관리</Button>
            </Link>
          </Stack>
          <Divider />
          <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
            <Link
              to="/mypage/waiting"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              <Button variant="text">신청한 스터디 상태 조회</Button>
            </Link>
          </Stack>
          <Divider />
          <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
            <Link
              to="/mypage/rejection_study"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              <Button variant="text">이용 제한 내역</Button>
            </Link>
          </Stack>
        </Stack>
      </Card>

      <Card
        sx={{
          mb: 3,
          p: 3,
          boxShadow: 0,
          border: "1px solid #e0e0e0",
          width: "700px",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          게시판 관리
        </Typography>
        <Divider />
        <Stack>
          <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
            <Link
              to="/mypage/posts"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              <Button variant="text">게시글 관리</Button>
            </Link>
          </Stack>
          <Divider />

          <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
            <Link
              to="/mypage/comments"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              <Button variant="text">댓글 관리</Button>
            </Link>
          </Stack>
          <Divider />

          <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
            <Link
              to="/mypage/rejection_post"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              <Button variant="text">이용 제한 내역</Button>
            </Link>
          </Stack>
        </Stack>
      </Card>

      <Card
        sx={{
          mb: 3,
          p: 3,
          boxShadow: 0,
          border: "1px solid #e0e0e0",
          width: "700px",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          기타
        </Typography>
        <Divider />
        <Stack>
          <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
            <Link
              to="/mypage/withdrawal"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              <Button variant="text">탈퇴하기</Button>
            </Link>
          </Stack>
          <Divider />
          <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
            <Link
              to="/mypage/notification"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              <Button variant="text">알림설정</Button>
            </Link>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}
