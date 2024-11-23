import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Input,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/joy";
import instance from "../../shared/Request"; // Import instance
import styled from 'styled-components';
import "./Study.css";

// Example of a styled component using transient props
const StyledButton = styled(Button)`
  background-color: #334EAC;
`;

const EntireStudy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [studies, setStudies] = useState([]);
  const [searchExecuted, setSearchExecuted] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    instance.get(`/study/search/tag?tag=${searchQuery}`)
      .then(response => {
        console.log("Search response:", response.data);
        setStudies(response.data);
        setSearchExecuted(true);
      })
      .catch(error => {
        console.error('There was an error fetching the studies!', error);
        setSearchExecuted(true);
      });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        level="h1"
        component="div"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center", mb: 3, color: "#334EAC" }}
      >
        모임 찾기
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Input 
          placeholder="검색어를 입력하세요" 
          sx={{ width: "780px" }} 
          value={searchQuery}
          onChange={handleInputChange}
        />
        <StyledButton sx={{ ml: 2 }} onClick={handleSearch}>검색</StyledButton>
      </Box>
      <Typography
        level="h5"
        component="div"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center", mb: 3 }}
      >
        당신에게 맞는 모임을 찾아드릴게요!
      </Typography>
      {searchExecuted && studies.length === 0 && (
        <Typography
          level="h6"
          component="div"
          gutterBottom
          sx={{ display: "flex", justifyContent: "center", mb: 3 }}
        >
          0건의 검색결과
        </Typography>
      )}
      <Grid container spacing={3} sx={{ mb: 3, justifyContent: "center" }}>
        {studies.map((study, index) => (
          <Grid key={index} item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Card variant="outlined" sx={{ backgroundColor: "white", width: 300, height: 300, margin: 1 }}>
              <CardContent>
                <Typography level="h5">이름: {study.name}</Typography>
                <Typography>소개: {study.introduction}</Typography>
                <Typography>모임 요일: {study.day}</Typography>
                <Typography>시작 시간: {study.start_time}</Typography>
                <Typography>종료 시간: {study.end_time}</Typography>
                <Typography>태그: {study.tag}</Typography>
              </CardContent>
              <CardActions>
                <StyledButton>Join!</StyledButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EntireStudy;