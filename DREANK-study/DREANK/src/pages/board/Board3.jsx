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
        <div className="board-writing">삼성 최종 합격했습니다.</div>
        <hr className="board-divider" />
        <div className="board-writing">토익 300에서 700점된 썰</div>
        <hr className="board-divider" />
        <div className="board-writing">자소서 첨삭해드림~~</div>
        <hr className="board-divider" />
        <div className="board-writing">독학으로 ncs 합격</div>
        <hr className="board-divider" />
        <div className="board-writing">면접 안 떠는 꿀팁</div>
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
