import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  padding: 20px;
  text-align: center;
`;

export const Container = styled.div`
  padding: 20px; /* 패딩 값을 조정 */
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    display: block;
    margin-bottom: 5px;
    color: #343a40;
  }

  input {
    width: 100%;
    max-width: 250px; /* 최대 너비 설정 */
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
`;

export const InputContainer2 = styled(InputContainer)`
  input {
    padding: 10px;
    text-align: left;
    line-height: 1.2;
  }
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  max-width: 250px; /* 최대 너비 설정 */
  margin: 0 auto;
  padding: 10px;
  background-color: ${(props) => (props.isValid ? "#334EAC" : "#fff")};
  color: #ffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #7096d1;
    cursor: default;
  }
`;

export const ModalContainer = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #868e96;
  justify-content: center;
  align-items: center;
`;

export const BottomLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const BottomLink = styled.span`
  margin-right: 10px;
  color: #7096d1;
`;

export const LoginLink = styled.a`
  color: #7096d1;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: bold;

  &:hover {
    color: #334eac;
  }
`;

export const WeekdaysInputContainer = styled(InputContainer)`
  position: relative;
`;
export const WeekdaysList = styled.ul`
  position: relative;
  width: 100%;
  max-width: 250px;
  max-height: 120px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px;
`;

export const WeekdaysItem = styled.li`
  list-style: none;
  cursor: pointer;
  padding: 5px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
