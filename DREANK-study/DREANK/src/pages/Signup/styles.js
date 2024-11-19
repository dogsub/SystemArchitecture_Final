import styled from "styled-components";

export const TermsBox = styled.div`
  width: 100%;
  max-width: 300px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  overflow-y: scroll; /* 스크롤 가능하게 */
  background-color: #f9f9f9; /* 배경색 추가 */
`;


export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  text-align: center;
`;

export const Container = styled.div`
  padding-bottom: 200px;
`;
export const ContractContainer = styled.div`
  padding-bottom: 200px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
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
    max-width: 250px;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 5px; /* 타원형으로 변경 */
    box-sizing: border-box;
  }

  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
`;

export const InputContainer2 = styled.div`
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
    max-width: 250px;
    padding: 10px; /* Adjust padding for better alignment */
    border: 1px solid #ced4da;
    border-radius: 5px;
    box-sizing: border-box;
    padding-bottom: 50px;
    text-align: left; /* Ensure text is left-aligned */
    line-height: 1.2; /* Adjust line-height for better text alignment */
  }

  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
`;

export const Button = styled.button`
    display: block;
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
    padding: 10px;
    background-color: ${(props) => (props.isValid ? "#334EAC" : "#fff")};
    color: ${(props) => (props.isValid ? "#fff" : "#333")};
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: ${(props) => (props.isValid ? "pointer" : "not-allowed")}; /* 비활성화 시 커서 변경 */
    opacity: ${(props) => (props.isLoading ? 0.5 : 1)}; /* 로딩 중일 때 흐리게 처리 */
    pointer-events: ${(props) => (props.isLoading ? "none" : "auto")}; /* 로딩 중일 때 클릭 방지 */
    transition: background-color 0.3s;

    &:disabled {
        background-color: #7096d1;
        cursor: not-allowed;
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
  border-radius: 20px; /* 타원형으로 변경 */
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
  margin-top: 20px; /* 버튼과의 간격 조절 */
`;

export const BottomLink = styled.span`
  margin-right: 10px; /* 링크 사이의 간격 조절 */
  color: #7096d1; /* 텍스트 색상 변경 */
`;

export const LoginLink = styled.a`
  color: #7096d1; /* 텍스트 색상 변경 */
  cursor: pointer;
  text-decoration: none; /* 밑줄 제거 */
  transition: color 0.3s; /* 컬러 전환 효과 */
  font-weight: bold;
  &:hover {
    color: #334eac; /* 호버 시 텍스트 컬러 변경 */
  }
`;
export const ContractText = styled.p`
  font-size: 14px;
  color: black;
  margin-bottom: 10px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 20px;
`;

export const Checkbox = styled.input`
  margin-right: 10px;
`;
export const AgreementLabel = styled.label`
  font-size: 12px; /* 폰트 크기를 작게 조정합니다. */
  color: #555; /* 회색으로 설정합니다. */
`;
export const AgreementLabel2 = styled.label`
  font-size: 12px; /* 폰트 크기를 작게 조정합니다. */
  color: #555; /* 회색으로 설정합니다. */
`;
