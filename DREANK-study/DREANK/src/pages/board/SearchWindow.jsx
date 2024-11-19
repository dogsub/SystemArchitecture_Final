// import React,
import { useState } from "react";
import "./DetailBoard.css";

const SearchWindow = () => {
  const [inputValue, setInputValue] = useState(""); // 입력값을 저장할 상태

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력이 변경될 때 상태 업데이트
  };

  const handleSearch = async () => {
    // 검색 처리 함수
    const response = await fetch("http://localhost:8080/api/search", {
      // 백엔드 URL로 변경하세요
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: inputValue }), // 입력값을 JSON으로 전송
    });

    const data = await response.json(); // 서버가 JSON으로 응답한다고 가정
    console.log(data); // 응답 데이터 처리
  };

  return (
    <div className="search-window">
      <input
        type="search"
        className="search-input"
        placeholder="검색하기"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
};

export default SearchWindow;
