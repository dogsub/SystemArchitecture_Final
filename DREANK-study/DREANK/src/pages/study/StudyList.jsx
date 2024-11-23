//import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Study from "./Study";
import "./Study.css";

const StudyList = ({ studies }) => {
  if (studies.length === 0) {
    return <div className="no-studies">현재 표시할 스터디가 없습니다.</div>;
  }

  return (
    <div className="writing-lists2">
      {studies.map((post) => (
        <Link key={post.id} to={`/study/${post.id}`} className="study-link">
          <Study post={post} />
        </Link>
      ))}
    </div>
  );
};

StudyList.propTypes = {
  studies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      introduction: PropTypes.string.isRequired,
      num_recruit: PropTypes.number.isRequired,
      start_time: PropTypes.string.isRequired, // Assuming LocalTime is converted to string
      end_time: PropTypes.string.isRequired, // Assuming LocalTime is converted to string
      day: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StudyList;
