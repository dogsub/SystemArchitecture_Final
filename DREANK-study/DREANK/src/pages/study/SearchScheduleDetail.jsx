import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './SearchStudy.css';
import instance from '../../shared/Request';
import StudyList from './StudyList';

const daysOptions = [
  { value: 'MON', label: '월요일' },
  { value: 'TUE', label: '화요일' },
  { value: 'WED', label: '수요일' },
  { value: 'THU', label: '목요일' },
  { value: 'FRI', label: '금요일' },
  { value: 'SAT', label: '토요일' },
  { value: 'SUN', label: '일요일' },
];

const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, '0');
  const minutes = i % 2 === 0 ? '00' : '30';
  return { value: `${hours}:${minutes}:00`, label: `${hours}:${minutes}` };
});

const dayMap = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
};

const formatTime = (time) => {
  const [hour, minute, second] = time.split(':');
  const period = hour < 12 ? 'AM' : 'PM';
  const formattedHour = (hour % 12) || 12;
  return `${period} ${String(formattedHour).padStart(2, '0')}:${minute}`;
};

const SearchScheduleDetail = () => {
  const [tagContent, setTagContent] = useState('');
  const [preferredDay, setPreferredDay] = useState('');
  const [preferredStartTime, setPreferredStartTime] = useState('');
  const [preferredEndTime, setPreferredEndTime] = useState('');
  const [studies, setStudies] = useState([]);
  const [filteredStudies, setFilteredStudies] = useState([]);
  const [titleText, setTitleText] = useState('내 일정에 맞는 모임');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchInitialStudies = async () => {
      try {
        const response = await instance.get(`/user/${localStorage.getItem('user_id')}/calendar/searchGroupUsingCalendar`);
        if (response.status === 200) {
          console.log(response.data)
          setStudies(response.data);
          setFilteredStudies(response.data); // 초기 데이터로 필터링된 목록도 설정
        }
      } catch (error) {
        console.log(error);
        setErrorMessage('데이터 전송에 실패하였습니다!');
      }
    };

    fetchInitialStudies();
  }, []);

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams({
        tagContent,
        preferredDay: preferredDay.value,
        preferredStartTime,
        preferredEndTime
      });

      const url = `/user/${localStorage.getItem('user_id')}/calendar/filterByTagAndTime?${params.toString()}`;
      console.log('Request URL:', url);

      const response = await instance.get(url);
      console.log(response);
      if (response.status === 200) {
        setStudies(response.data);
        setTitleText('검색결과');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('데이터 전송에 실패하였습니다!');
    }
  };

  const handleJoin = async (studyId) => {
    try {
      const response = await instance.post(`/study/${studyId}/apply/${localStorage.getItem('user_id')}`, {
      });
      if (response.status === 200) {
        alert('스터디에 성공적으로 신청되었습니다.');
      }
    } catch (error) {
      console.error('스터디 신청 중 오류가 발생했습니다.', error);
      alert('스터디 신청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='entire-study-page'>
      <div className='title'>일정으로 모임 찾기</div>
      <div className='search-container'>
        <div className='input-group'>
          <label>태그</label>
          <input
            type="text"
            placeholder="태그를 입력하세요"
            value={tagContent}
            onChange={(e) => setTagContent(e.target.value)}
            className="input-tag"
          />
        </div>
        <div className='input-group'>
          <label>요일</label>
          <Select
            options={daysOptions}
            placeholder="요일을 선택하세요"
            value={preferredDay}
            onChange={(option) => setPreferredDay(option)}
            className="input-select"
          />
        </div>
        <div className='input-group'>
          <label>시작 시간</label>
          <Select
            options={timeOptions}
            placeholder="시작 시간을 선택하세요"
            value={timeOptions.find(option => option.value === preferredStartTime)}
            onChange={(option) => setPreferredStartTime(option.value)}
            className="input-time-picker"
          />
        </div>
        <div className='input-group'>
          <label>종료 시간</label>
          <Select
            options={timeOptions}
            placeholder="종료 시간을 선택하세요"
            value={timeOptions.find(option => option.value === preferredEndTime)}
            onChange={(option) => setPreferredEndTime(option.value)}
            className="input-time-picker"
          />
        </div>
        <button onClick={handleSearch} className="search-button">검색</button>
      </div>
      <div className="study-title2">{titleText}</div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className='study-list'>
        {filteredStudies.length > 0 ? (
          filteredStudies.map(study => (
            <div key={study.id} className='study-card'>
              <h3>{study.name}</h3>
              <p>태그: {study.tag}</p>
              <p>요일: {dayMap[study.day]}</p>
              <p>시간: {formatTime(study.startTime)} - {formatTime(study.endTime)}</p>
              <button onClick={() => handleJoin(study.id)} className="search-button">신청하기</button>
            </div>
          ))
        ) : (
          <div className='no-results'>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SearchScheduleDetail;
