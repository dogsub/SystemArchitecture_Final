import styled from "styled-components";

export const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: white;
  width: 100%;
  top: 0;
  position: fixed;
  height: 40px;
  z-index: 100;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  color: #334eac;
  &:hover {
    color: #334eac;
  }
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const Logo = styled.img`
  width: 50px;
  height: auto;
  margin-right: 20px;
`;

export const BrandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 0; /* BrandWrapper의 상하 여백을 없앱니다. */
`;

export const BrandName = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 0; /* BrandName의 하단 여백을 없앱니다. */
`;

export const Tagline = styled.span`
  font-size: 1em;
  font-weight: bold;
  color: #7096d1;
  margin-top: 0; /* Tagline의 상단 여백을 없앱니다. */
`;

export const CenterSection = styled.div`
  display: flex;
  gap: 20px;
  color: #334eac;
  &:hover {
    color: #7096d1;
  }
`;

export const NavItem = styled.div`
  cursor: pointer;

  color: ${({ active }) => (active ? "#334EAC" : "gray")};

  /* hover 시에도 색상이 변하지 않도록 설정 */
  &:hover {
    color: ${({ active }) => (active ? "#334EAC" : "#7096D1")};
  }
`;

export const RightSection = styled.div`
  display: flex;

  gap: 20px;
  align-items: center;
  margin-right: 60px;
`;

export const MypageIcon = styled.img`
  width: 30px; /* 아이콘 크기 조절 */
  height: auto; /* 아이콘 크기 조절 */
  margin-right: 20px;
`;

export const ChatIcon = styled.img`
  width: 30px; /* 아이콘 크기 조절 */
  height: auto; /* 아이콘 크기 조절 */
  margin-right: 20px;
  cursor: pointer;
`;

export const CalendarIcon = styled.img`
  width: 28px; /* 아이콘 크기 조절 */
  height: auto; /* 아이콘 크기 조절 */
  margin-right: 20px;
`;
