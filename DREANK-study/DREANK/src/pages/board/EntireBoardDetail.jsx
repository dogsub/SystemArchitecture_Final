//import React from 'react';
import { Link } from "react-router-dom";

//import WritingEditor from "./WritingEditor";
import PopularBoardDetail from "./PopularBoardDetail";
import SearchWindow from "./SearchWindow";
import WritingLists from "./WritingLists";

import "./DetailBoard.css";

const EntireBoardDetail = () => {
  return (
    <div className="entire-board-page">
      <div className="top-detail">
        <div className="title-detail left">전체 게시판</div>
        <Link to="/board-editor">
          <button type="button" className="writing-button right">
            글쓰기
          </button>
        </Link>
        {/* <button className="writing-button right">글쓰기</button> */}
      </div>
      <PopularBoardDetail></PopularBoardDetail>
      <SearchWindow></SearchWindow>
      <WritingLists></WritingLists>
    </div>
  );
};

export default EntireBoardDetail;
