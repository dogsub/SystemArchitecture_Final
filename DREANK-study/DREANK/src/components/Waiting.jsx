import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import instance from "../shared/Request";

export default function Waiting() {
  const [studies, setStudies] = useState([]);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await instance.get(`/search/waiting/${userId}`);
        setStudies(response.data);
      } catch (error) {
        console.error("Failed to fetch studies:", error);
      }
    };

    fetchStudies();
  }, [userId]);

  const handleCancel = async (studyId) => {
    try {
      await instance.delete(`/search/waiting/${userId}/${studyId}`);
      setStudies(studies.filter(study => study.id !== studyId));
      alert('신청이 취소되었습니다.');
    } catch (error) {
      console.error("Failed to cancel study application:", error);
      alert('신청 취소 중 오류가 발생했습니다.');
    }
  };

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
        신청한 스터디 상태 조회
      </Typography>

      {studies.map((study, index) => (
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
            #{study.tag}
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#666", mb: 2 }}>
            회원수: {study.members}명
          </Typography>
          <Button
            variant="plain"
            sx={{ width: '100%' }}
            onClick={() => handleCancel(study.id)}
          >
            신청 취소 하기
          </Button>
        </Card>
      ))}
    </Box>
  );
}
