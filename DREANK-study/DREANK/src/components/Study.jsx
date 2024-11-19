import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import instance from "../shared/Request";

const dayMap = {
  MON: "월요일",
  TUE: "화요일",
  WED: "수요일",
  THU: "목요일",
  FRI: "금요일",
  SAT: "토요일",
  SUN: "일요일",
};

const formatTime = (time) => {
  const [hour, minute, second] = time.split(":");
  const period = hour < 12 ? "AM" : "PM";
  const formattedHour = (hour % 12) || 12;
  return `${period} ${String(formattedHour).padStart(2, "0")}:${minute}`;
};

export default function Study() {
  const [studies, setStudies] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    // 스터디 데이터를 가져오는 함수
    const fetchStudies = async () => {
      try {
        const response = await instance.get(`/study/search/study/${userId}`);
        setStudies(response.data);
      } catch (error) {
        console.error("Failed to fetch studies:", error);
      }
    };

    fetchStudies();
  }, [userId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#FFFFFF",
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "#334EAC", fontWeight: "bold", fontSize: 30 }}
      >
        가입한 스터디 관리
      </Typography>

      {studies.length > 0 ? (
        studies.map((study, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              p: 3,
              boxShadow: 2,
              border: "1px solid #e0e0e0",
              width: "700px",
              borderRadius: "16px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {study.name}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#666" }}>
              {study.introduction}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#666" }}>
              {study.tag}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#666" }}>
              {dayMap[study.day]}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#666", mb: 2 }}>
              {formatTime(study.start_time)} - {formatTime(study.end_time)}
            </Typography>
            <Button variant="plain" sx={{ width: "100%", color:"black" }}>
              탈퇴하기
            </Button>
          </Card>
        ))
      ) : (
        <Typography>가입한 스터디가 없습니다.</Typography>
      )}
    </Box>
  );
}
