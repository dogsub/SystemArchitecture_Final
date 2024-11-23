import styled from "styled-components";
export const Container = styled.div``;
export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  text-align: center;
`;

export const joojack = styled.div`
  color: red;
  font-size: 12px; /* 폰트 크기를 조정 */
  text-align: center; /* 가운데 정렬 */
`;
export const InputContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  input {
    width: 100%;
    max-width: 300px;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 5px; /* 타원형으로 변경 */
    box-sizing: border-box;
  }
  img {
    width: 20px; /* Set the width of the icon */
    margin-right: 10px; /* Add margin to separate the icon from the input field */
  }
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 10px;
  color: white;
  background-color: #334eac;

  border: 1px solid #ccc;
  border-radius: 5px; /* 타원형으로 변경 */
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
`;
export const HorizontalLine = styled.hr`
  width: 250px;
  margin: 20px auto;
  margin-top: 30px;
  border: none; /* Remove the border */
  border-top: 0.5px solid gray; /* Add a top border with the desired thickness */
  transform: scaleY(0.5); /* Scale the line vertically to make it thinner */
`;
export const SocialLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: gray;
  cursor: pointer;

  img {
    position: absolute;
    left: 10px;
    width: 30px; /* Adjust width as needed */
    height: 30px; /* Adjust height as needed */
  }

  span {
    flex: 1;
    text-align: center;
    z-index: 1;
  }
`;

export const SocialLoginButton2 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: gray;
  cursor: pointer;

  img {
    position: absolute;
    left: 12px;
    width: 25px; /* Adjust width as needed */
    height: 25px; /* Adjust height as needed */
  }

  span {
    flex: 1;
    text-align: center;
    z-index: 1;
  }
`;
export const SocialLoginButton3 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: gray;
  cursor: pointer;

  img {
    position: absolute;
    left: 5px;
    width: 40px; /* Adjust width as needed */
    height: 30px; /* Adjust height as needed */
  }

  span {
    flex: 1;
    text-align: center;
    z-index: 1;
  }
`;
