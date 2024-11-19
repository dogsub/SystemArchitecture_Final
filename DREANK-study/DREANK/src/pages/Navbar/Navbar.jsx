import * as t from "./styles";
import { Link } from "react-router-dom";
import dreanklogo from "../../assets/dreanklogo.png";
import { useState } from "react";
import mypage from "../../assets/mypage.png";
import chat from "../../assets/chat.png";
import calendar from "../../assets/calendar.png";
import instance from "../../shared/Request";

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("nickname")); // 사용자 이름 상태

  const handleNavItemClick = (itemName) => {
    setActiveNavItem(itemName);
  };

  // 사용자 로그아웃 시 호출되는 함수
  const handleLogout = async () => {
    try {
      const response = await instance.get("/logout");
      if (response.status === 200) {
        localStorage.removeItem("email");
        localStorage.removeItem("nickname");
        localStorage.removeItem("user_id");
        setUsername("");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <t.NavbarWrapper>
      {/* 왼쪽 섹션 */}
      <t.LeftSection as={Link} to="/">
        <t.Logo src={dreanklogo} alt="Logo" />
        <t.BrandWrapper>
          <t.Tagline>LINK YOUR DREAM</t.Tagline>
          <t.BrandName>DREANK</t.BrandName>
        </t.BrandWrapper>
      </t.LeftSection>

      {/* 중앙 섹션 */}
      <t.CenterSection>
        {username ? ( // 로그인 상태
          <t.NavItem
            as={Link}
            onClick={handleLogout} // 로그아웃 함수 호출
          >
            Logout
          </t.NavItem>
        ) : (
          // 비로그인 상태
          <>
            <t.NavItem
              as={Link}
              to="/login"
              onClick={() => handleNavItemClick("login")}
              active={activeNavItem === "login"}
            >
              Login
            </t.NavItem>
            <t.NavItem
              as={Link}
              to="/signup"
              onClick={() => handleNavItemClick("signup")}
              active={activeNavItem === "signup"}
            >
              Sign Up
            </t.NavItem>
          </>
        )}
        <t.NavItem
          as={Link}
          to="/study"
          onClick={() => handleNavItemClick("makestudy")}
          active={activeNavItem === "makestudy"}
        >
          스터디
        </t.NavItem>
        <t.NavItem
          as={Link}
          to="/board"
          onClick={() => handleNavItemClick("board")}
          active={activeNavItem === "board"}
        >
          게시판
        </t.NavItem>
      </t.CenterSection>

      {/* 오른쪽 섹션 */}
      <t.RightSection>
        {username ? ( // 로그인 상태에 따라 다르게 표시
          <>
            <span>{`${username} 님`}</span> {/* 사용자 이름 표시 */}
            <t.NavItem as={Link} to="/calendar">
              <t.CalendarIcon src={calendar} alt="Calendar" />
            </t.NavItem>
            <t.NavItem as={Link} to="/chat">
              <t.ChatIcon src={chat} alt="Chat" />
            </t.NavItem>
            <t.NavItem as={Link} to="/mypage">
              <t.MypageIcon src={mypage} alt="My Page" />
            </t.NavItem>
          </>
        ) : (
          <>
            <t.NavItem as={Link} to="/calendar">
              <t.CalendarIcon src={calendar} alt="Calendar" />
            </t.NavItem>
            <t.NavItem as={Link} to="/chat">
              <t.ChatIcon src={chat} alt="Chat" />
            </t.NavItem>
            <t.NavItem as={Link} to="/mypage">
              <t.MypageIcon src={mypage} alt="My Page" />
            </t.NavItem>
          </>
        )}
      </t.RightSection>
    </t.NavbarWrapper>
  );
};

export default Navbar;
