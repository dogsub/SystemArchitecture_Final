import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import instance from "../shared/Request";


export default function Mystudy() {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    // 스터디 데이터를 가져오는 함수
    const fetchStudies = async () => {
      try {
        const response = await instance.get(`/study/search/my/${localStorage.getItem('user_id')}`);
        setStudies(response.data);
      } catch (error) {
        console.error("Failed to fetch studies:", error);
      }
    };

    fetchStudies();
  }, []);

  const handleEndRecruitment = async (studyId) => {
    try {
      await instance.put(`/study/${studyId}/status`, {
        status: "COMPLETE"
      });
      alert("스터디 모집이 종료되었습니다.");
      setStudies(studies.map(study => study.id === studyId ? { ...study, status: "COMPLETE" } : study));
    } catch (error) {
      console.error("Error ending recruitment", error);
      alert("모집 종료 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteStudy = async (studyId) => {
    try {
      await instance.delete(`/study/${studyId}`);
      alert("스터디가 삭제되었습니다.");
      setStudies(studies.filter(study => study.id !== studyId));
    } catch (error) {
      console.error("Error deleting study", error);
      alert("스터디 삭제 중 오류가 발생했습니다.");
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
        내 스터디 관리
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
            회원수: {study.num_recruit}명
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#666", mb: 2 }}>
            상태: {study.status}
          </Typography>
          <CardActions sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="plane"
              sx={{ width: '48%' }}
              onClick={() => handleEndRecruitment(study.id)}
            >
              모집 종료
            </Button>
            <Button
              variant="plane"
              sx={{ width: '48%' }}
              onClick={() => handleDeleteStudy(study.id)}
            >
              삭제하기
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
