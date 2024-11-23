import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/joy";

const StudyHome = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        level="h1"
        component="div"
        gutterBottom
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
          color: "#334EAC",
        }}
      >
        스터디 찾기
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3, justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          md={2}
          sx={{ display: "flex", justifyContent: "center" }}
        ></Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            variant="outlined"
            sx={{ backgroundColor: "white", width: 200, height: 250, mr: 5 }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography level="h3" align="center">
                태그로 찾기
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Link to="/study-board" style={{ textDecoration: "none" }}>
                <Button sx={{ backgroundColor: "#334EAC" }}>Go!</Button>
              </Link>
            </CardActions>
          </Card>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: "white",
              width: 200,
              height: 250,
              mr: 5,
              ml: 5,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography level="h3" align="center">
                일정으로 찾기
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Link
                to="/study-search-schedule"
                style={{ textDecoration: "none" }}
              >
                <Button sx={{ backgroundColor: "#334EAC" }}>Go!</Button>
              </Link>
            </CardActions>
          </Card>
          <Box sx={{ position: "relative" }}>
            <Card
              variant="outlined"
              sx={{ backgroundColor: "white", width: 200, height: 250, ml: 5 }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography level="h3" align="center">
                  스터디 만들기
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Link to="/makestudy" style={{ textDecoration: "none" }}>
                  <Button sx={{ backgroundColor: "#334EAC" }}>Go!</Button>
                </Link>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{ display: "flex", justifyContent: "center" }}
        ></Grid>
      </Grid>
    </Box>
  );
};

export default StudyHome;
