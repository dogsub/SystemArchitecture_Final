//import React from 'react';
import PropTypes from "prop-types";
import "./Study.css";

const Study = ({ post }) => {
  return (
    <div className="study-container">
      <div className="study-title">{post.name}</div>
      <div className="study-info">{post.introduction}</div>
      <div className="study-info">모집 인원: {post.num_recruit}</div>
      <div className="study-info">시작 시간: {post.start_time}</div>
      <div className="study-info">종료 시간: {post.end_time}</div>
      <div className="study-info">요일: {post.day}</div>
      <div className="study-info">태그: {post.tag}</div>
    </div>
  );
};

Study.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    num_recruit: PropTypes.number.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
};

export default Study;
