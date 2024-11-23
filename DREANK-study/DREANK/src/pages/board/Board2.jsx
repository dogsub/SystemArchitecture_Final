/* eslint-disable */

import React from "react";
import { Link } from "react-router-dom";
import "./Board.css";
import EntireBoardDetail from "./EntireBoardDetail";

const Board = ({ pagelink, position, title, explain }) => {
  return (
    <div className={position}>
      <div className="board-container">
        <div className="board-title">{title}</div>
        <div className="board-ex">{explain}</div>
        <br />
        <div className="board-writing">강남/토익스터디</div>
        <hr className="board-divider" />
        <div className="board-writing">삼성 코테준비 같이해요!!</div>
        <hr className="board-divider" />
        <div className="board-writing">네이버 최종면접</div>
        <hr className="board-divider" />
        <div className="board-writing">오픽 연습 같이해요</div>
        <hr className="board-divider" />
        <div className="board-writing">토익800점목표</div>
        <hr className="board-divider" />
      </div>
      <Link to={pagelink}>
        <button type="button" className="detail-button">
          더보기
        </button>
      </Link>
    </div>
  );
};
export default Board;
