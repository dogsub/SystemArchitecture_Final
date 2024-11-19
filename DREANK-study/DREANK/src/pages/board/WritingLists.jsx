// import React,
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Post from "./Post";

import "./DetailBoard.css";

const WritingLists = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 여기서 API 호출 등을 통해 게시물 데이터를 가져옴
    setPosts([
      { id: 1, title: "오늘 면접인데 ", content: "복장 추천좀" },
      { id: 2, title: "GSAT 문풀 정답 공유", content: "하실 분 댓글 주세요" },
      { id: 3, title: "코테 스터디 구합니다", content: "ㅈㄱㄴ" },
      {
        id: 4,
        title: "면접 스터디 홍보",
        content: "현재 인원 17명, 매주 월요일, 빡센 관리...",
      },
      {
        id: 5,
        title: "토익 800 2주 완성 팁",
        content: "안녕하세요. 저는 바쁜 대학생활 중에도 ",
      },
    ]);
  }, []);

  return (
    <div className="writing-lists2">
      {/* <li>
                <ul>제목</ul>
                <hr/>
                <ul>알라랄아릴</ul>
                <div className='content'>오늘 내가 면접보고 왔는데</div>
                <hr/>
                <ul>알라랄아릴</ul>
                <div className='content'>오늘 내가 면접보고 왔는데</div>
                <hr/>
                <ul>알라랄아릴</ul>
                <div className='content'>오늘 내가 면접보고 왔는데</div>
                <hr/>
                <ul>알라랄아릴</ul>
                <div className='content'>오늘 내가 면접보고 왔는데</div>
                <hr/>
                <ul>알라랄아릴</ul>
                <div className='content'>오늘 내가 면접보고 왔는데</div>
                
            </li> */}
      {posts.map((post) => (
        <Link key={post.id} to={`/post/${post.id}`}>
          {/* <Post post={post} /> */}
        </Link>
      ))}
    </div>
  );
};
export default WritingLists;
