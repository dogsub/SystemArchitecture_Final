import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  padding: 20px;
  margin-top: 150px;
  margin-bottom: 60px;
`;

export const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 0.5em;
  color: #334eac; /* 폰트의 색상을 #334EAC로 설정합니다. */
`;

export const Subtitle = styled.p`
  font-size: 1.5em;
  margin-bottom: 8em;
  color: gray;
`;

export const Section1 = styled.div`
  display: flex;
  align-items: center;
  margin: 3em 0;
  flex-wrap: wrap;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;
export const Section2 = styled.div`
  display: flex;
  align-items: center;
  margin: 3em 0;
  flex-wrap: wrap;
  padding-right: 20px;
  margin-left: 50px;
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;
export const SectionText1 = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 600px;
  margin-left: 100px;
  margin-right: 100px;
`;
export const SectionText2 = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 600px;
  margin-left: 20px;
`;
export const SectionTitle = styled.h3`
  font-size: 2em;
  margin-bottom: 1em;
  color: #334eac;
`;

export const SectionContent = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  text-align: justify;
`;

export const SectionImage1 = styled.img`
  flex: 1;
  max-width: 30%;
  height: auto;
  padding: 20px;
  margin-left: 100px;
  border-radius: 50px; /* 둥근 테두리를 적용합니다. */
`;
export const SectionImage2 = styled.img`
  flex: 1;
  max-width: 40%;
  height: auto;
  padding: 20px;
  margin-left: 80px;
`;
