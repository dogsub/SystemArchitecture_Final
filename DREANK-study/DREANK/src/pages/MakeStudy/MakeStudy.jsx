import { useEffect, useState, useRef } from "react";
import * as t from "./styles";
import { useNavigate } from "react-router-dom";
import instance from "../../shared/Request";

const MakeStudy = () => {
  const username = localStorage.getItem("nickname");
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      if (!username) {
        alert("로그인 후 이용해주세요!");
        navigate("/login");
      }
    }
  }, [username, navigate]);

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [num, setNum] = useState("");
  const [tagError, setTagError] = useState("");
  const [nameError, setNameError] = useState("");
  const [numError, setNumError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDayDisplay, setSelectedDayDisplay] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [introduction, setIntroduction] = useState("");

  const handleNameChange = (value) => {
    setName(value);
    if (isSubmitted && value.trim() === "") {
      setNameError("스터디 이름을 입력해주세요!");
    } else {
      setNameError("");
    }
  };

  const handleTagChange = (value) => {
    setTag(value);
    if (isSubmitted && value.trim() === "") {
      setTagError("태그를 입력해주세요!");
    } else {
      setTagError("");
    }
  };

  const handleNumChange = (value) => {
    setNum(value);
    const parsedNum = parseInt(value);
    if (isSubmitted && isNaN(parsedNum)) {
      setNumError("모집인원은 숫자로 입력해주세요!");
    } else {
      setNumError("");
    }
  };

  const handleDayClick = (day) => {
    const dayMap = {
      월요일: "MON",
      화요일: "TUE",
      수요일: "WED",
      목요일: "THU",
      금요일: "FRI",
      토요일: "SAT",
      일요일: "SUN",
    };
    setSelectedDay(dayMap[day]);
    setSelectedDayDisplay(day);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleTimeClick = (time) => {
    if (!selectedStartTime) {
      setSelectedStartTime(time);
      setShowTimeDropdown(true);
    } else if (!selectedEndTime) {
      setSelectedEndTime(time);
      setShowTimeDropdown(false);
    }
  };

  const toggleTimeDropdown = () => {
    setShowTimeDropdown(!showTimeDropdown);
  };

  const generateTimes = () => {
    const times = [];
    for (let hour = 9; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        times.push(
            `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        );
      }
    }
    return times;
  };

  const times = generateTimes();

  useEffect(() => {
    if (nameError || numError || tagError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [nameError, numError, tagError]);

  const handleJoin = async () => {
    setIsSubmitted(true); // Mark form as submitted when trying to join
    if (!isValid) return; // Prevent submission if form is invalid

    try {
      const response = await instance.post(`/study/post/${userId}`, {
        name: name,
        introduction: introduction,
        num_recruit: parseInt(num),
        start_time: selectedStartTime,
        end_time: selectedEndTime,
        day: selectedDay,
        tag: tag,
      });

      if (response.status === 200) {
        console.log(response);
        alert("스터디가 성공적으로 생성되었습니다!");
        navigate("/study-board");
      }
    } catch (error) {
      console.error("스터디 생성 중 오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/study-board"); // Redirect to the study-board page
  };

  return (
      <t.Container>
        <t.Title>
          <h3>스터디 만들기</h3>
        </t.Title>
        <t.InputContainer>
          <input
              id="name_input"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="스터디 이름"
          />
          <div className="error">{isSubmitted && nameError}</div>
        </t.InputContainer>

        <t.InputContainer>
          <input
              id="info_age"
              type="text"
              value={num}
              onChange={(e) => handleNumChange(e.target.value)}
              placeholder="모집인원"
          />
          <div className="error">{isSubmitted && numError}</div>
        </t.InputContainer>

        <t.WeekdaysInputContainer>
          <input
              id="weekdays_input"
              type="text"
              value={selectedDayDisplay || "요일"}
              onChange={() => {}}
              placeholder="요일"
              onClick={toggleDropdown}
              style={{ color: "gray" }}
          />

          {showDropdown && (
              <t.WeekdaysList>
                {["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"].map((day) => (
                    <t.WeekdaysItem key={day} onClick={() => handleDayClick(day)}>
                      {day}
                    </t.WeekdaysItem>
                ))}
              </t.WeekdaysList>
          )}
        </t.WeekdaysInputContainer>

        <t.WeekdaysInputContainer>
          <input
              id="time_input"
              type="text"
              value={`${
                  selectedStartTime
                      ? `${selectedStartTime} ${
                          selectedEndTime ? `~ ${selectedEndTime}` : "~"
                      }`
                      : "시간대"
              }`}
              onChange={() => {}}
              placeholder="시간대"
              onClick={toggleTimeDropdown}
              style={{
                color: selectedStartTime || selectedEndTime ? "black" : "gray",
              }}
          />

          {showTimeDropdown && (
              <t.WeekdaysList>
                {times.map((time) => (
                    <t.WeekdaysItem key={time} onClick={() => handleTimeClick(time)}>
                      {time}
                    </t.WeekdaysItem>
                ))}
              </t.WeekdaysList>
          )}
        </t.WeekdaysInputContainer>

        <t.InputContainer>
          <input
              id="tag_input"
              type="text"
              value={tag}
              onChange={(e) => handleTagChange(e.target.value)}
              placeholder="태그"
          />
          <div className="error">{isSubmitted && tagError}</div>
        </t.InputContainer>

        <t.InputContainer2>
          <input
              id="info_introduction"
              type="text"
              placeholder="소개글을 작성해주세요"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
          />
        </t.InputContainer2>

        <t.Button
            id="joinBtn"
            onClick={handleJoin}
            isValid={isValid}
            disabled={!isValid}
            style={{
              opacity: isValid ? 1 : 0.5,
              pointerEvents: isValid ? "auto" : "none",
            }}
        >
          완료
        </t.Button>
        <t.BottomLinksContainer>
          <t.BottomLink>다른 스터디를 구경해볼까요?</t.BottomLink>
          <t.BottomLink>
            <t.LoginLink onClick={handleLoginRedirect}>
              모임 찾기로 이동하기
            </t.LoginLink>
          </t.BottomLink>
        </t.BottomLinksContainer>
      </t.Container>
  );
};

export default MakeStudy;
