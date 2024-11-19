import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";
import DaySchedule from "../components/DaySchedule";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import instance from "../shared/Request";
import CalendarModal from "../components/CalendarModal"; // Import the AddEventModal component

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editMode, setEditMode] = useState(false); // State to handle edit mode
  const navigate = useNavigate();
  const username = localStorage.getItem('nickname');
  const userId = localStorage.getItem('user_id'); // Assuming userId is stored in localStorage
  const isMounted = useRef(false); // 마운트 상태 관리

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      if (!username) {
        alert("로그인 후 이용해주세요!");
        navigate("/login");
      } else {
        fetchEvents();
      }
    }
  }, [username, navigate]);

  const fetchEvents = async () => {
    try {
      const response = await instance.get(`/user/${userId}/calendar`);
      const eventsData = response.data.map(event => ({
        ...event,
        startTime: formatTime(event.startTime),
        endTime: formatTime(event.endTime),
        day: convertDayToString(event.dayOfWeek)
      }));
      setEvents(eventsData);
      console.log(eventsData);
    } catch (error) {
      console.error("이벤트 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const formatTime = (time) => {
    const [hour, minute, second] = time.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    second;
    return `${formattedHour}:${minute < 10 ? `0${minute}` : minute} ${ampm}`;
  };

  const convertDayToString = (day) => {
    const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    return daysOfWeek[day];
  };

  const handleEditEvent = async (updatedEvent) => {
    const eventToEdit = {
      activityName: updatedEvent.activityName,
      color: updatedEvent.color,
      startTime: formatToHHMMSS(updatedEvent.startTime),
      endTime: formatToHHMMSS(updatedEvent.endTime),
      dayOfWeek: updatedEvent.dayOfWeek
    };

    try {
      const response = await instance.patch(`/user/${userId}/calendar/${updatedEvent.id}`, eventToEdit);
      if (response.status === 200) {
        setEvents(events.map(event => event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await instance.delete(`/user/${userId}/calendar/${eventId}`);
      if (response.status === 200) {
        setEvents(events.filter(event => event.id !== eventId));
      }
    } catch (error) {
      console.error("이벤트 삭제 중 오류 발생:", error);
    }
  };

  const handleAddEvent = async (newEvent) => {
    // 일정 추가 로직
    const eventToAdd = {
      ...newEvent,
      userId: userId,
      startTime: formatToHHMMSS(newEvent.startTime),
      endTime: formatToHHMMSS(newEvent.endTime),
      dayOfWeek: convertDayToNumber(newEvent.dayOfWeek)
    };

    try {
      const response = await instance.post(`/user/${userId}/calendar`, eventToAdd);
      if (response.status === 200) {
        setEvents([...events, { ...eventToAdd, id: response.data.id }]);
      }
    } catch (error) {
      console.error("이벤트 추가 중 오류 발생:", error.response.data.message);
      alert(`${error.response.data.message}`);
    }
  };

  const formatToHHMMSS = (time) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${String(hours).padStart(2, '0')}:${minutes}:00`;
  };

  const convertDayToNumber = (day) => {
    const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    return daysOfWeek.indexOf(day);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 2, position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", marginBottom: "10px" }}>
          <h1 style={{ textAlign: "center", flex: 1, marginLeft: "100px" }}>Weekly Schedule</h1>
          <IconButton
            onClick={() => {
              setIsModalOpen(true);
              setEditMode(false);
              setSelectedEvent(null);
            }} // Open modal on click
            style={{
              position: "absolute",
              top: 30,
              right: 15,
              transform: "translateY(-50%)",
              zIndex: 1,
              marginLeft: "5px"
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
        <Calendar 
          events={events} 
          onEdit={(event) => {
            setSelectedEvent(event);
            setEditMode(true);
            setIsModalOpen(true);
          }} 
          onDelete={handleDeleteEvent} 
        />
      </div>
      <div style={{ flex: 1, padding: "20px", marginTop:"15px" }}>
        <DaySchedule events={events} />
      </div>
      <CalendarModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAddEvent={handleAddEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent} // 전달된 삭제 함수
        editMode={editMode}
        currentEvent={selectedEvent}
      />
    </div>
  );
}
