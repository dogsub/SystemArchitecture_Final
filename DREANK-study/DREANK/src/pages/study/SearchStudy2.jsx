import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Study.css';

const SearchStudy2 = ({ setTagContent, setPreferredDay, setPreferredStartTime, setPreferredEndTime, onSearch }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleStartTimeChange = (e) => {
    const time = e.target.value;
    setStartTime(time);
  };

  const handleEndTimeChange = (e) => {
    const time = e.target.value;
    setEndTime(time);
  };

  const handleStartTimeBlur = () => {
    if (/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(startTime)) {
      setPreferredStartTime(startTime);
    } else {
      alert('올바른 시간 형식이 아닙니다. HH:MM:SS 형식으로 입력하세요.');
      setStartTime('');
    }
  };

  const handleEndTimeBlur = () => {
    if (/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(endTime)) {
      setPreferredEndTime(endTime);
    } else {
      alert('올바른 시간 형식이 아닙니다. HH:MM:SS 형식으로 입력하세요.');
      setEndTime('');
    }
  };

  return (
    <div className="search-study2">
      <div className="search-study-inputs">
        <input
          type="search"
          className="search-study-input2"
          placeholder="태그"
          onChange={(e) => setTagContent(e.target.value)}
        />
        <input
          type="search"
          className="search-study-input2"
          placeholder="요일"
          onChange={(e) => setPreferredDay(e.target.value)}
        />
        <input
          type="text"
          className="search-study-input2"
          placeholder="시작 시간 (HH:MM:SS)"
          value={startTime}
          onChange={handleStartTimeChange}
          onBlur={handleStartTimeBlur}
        />
        <input
          type="text"
          className="search-study-input2"
          placeholder="끝 시간 (HH:MM:SS)"
          value={endTime}
          onChange={handleEndTimeChange}
          onBlur={handleEndTimeBlur}
        />
      </div>
      <button className="search-study-button2" onClick={onSearch}>검색</button>
    </div>
  );
};

SearchStudy2.propTypes = {
  setTagContent: PropTypes.func.isRequired,
  setPreferredDay: PropTypes.func.isRequired,
  setPreferredStartTime: PropTypes.func.isRequired,
  setPreferredEndTime: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchStudy2;
