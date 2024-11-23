// import React from "react";
import Board from "./Board"; // Board 컴포넌트 임포트
import Board2 from "./Board2"; // Board 컴포넌트 임포트
import Board3 from "./Board3";
const CategoryBoard = () => {
  return (
    <div className="category-board-container">
      {/* 첫 번째 게시판 */}
      <Board
        pagelink="board-detail"
        position="board left"
        title="전체 게시판"
        // explain="전체 페이지입니다"
      />

      {/* 두 번째 게시판 */}
      <Board2
        position="board"
        title="스터디 모집"
        // explain="스터디를 홍보하세요"
      />

      {/* 세 번째 게시판 */}
      <Board3
        position="board right"
        title="합격 수기"
        // explain="자유 게시판입니다"
      />
    </div>
  );
};

export default CategoryBoard;
