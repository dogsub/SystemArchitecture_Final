//import React
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../../shared/Request";
import "./StudyDetail.css";

const StudyDetail = () => {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const response = await instance.get(`/study/${id}`);
        if (response.status === 200) {
          setStudy(response.data);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("스터디 정보를 불러오는 데 실패하였습니다.");
      }
    };

    fetchStudyDetail();
  }, [id]);

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  if (!study) {
    return <div>Loading...</div>;
  }

  return (
    <div className="study-detail">
      <h2>{study.name}</h2>
      <p>{study.introduction}</p>
      <p>
        <strong>Number of Recruits:</strong> {study.num_recruit}
      </p>
      <p>
        <strong>Start Time:</strong> {study.start_time}
      </p>
      <p>
        <strong>End Time:</strong> {study.end_time}
      </p>
      <p>
        <strong>Day:</strong> {study.day}
      </p>
      <p>
        <strong>Tag:</strong> {study.tag}
      </p>
    </div>
  );
};

export default StudyDetail;
