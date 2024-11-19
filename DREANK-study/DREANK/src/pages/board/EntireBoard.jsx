import PopularBoard from "./PopularBoard";
import CategoryBoard from "./CategoryBoard";

import "./Board.css";

const EntireBoard = () => {
  return (
    <div className="entire-board-page">
      <div className="title">🔥 HOT 게시판 🔥</div>
      <PopularBoard />
      <div className="Category">
        <h3>📌카테고리</h3>
      </div>

      <CategoryBoard />
    </div>
  );
};

export default EntireBoard;
