import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/joy/Table";
import Modal from "react-modal";
import "./Calendar.css";
import CalendarModal from "./CalendarModal";

Modal.setAppElement("#root");

function createTimeSlots() {
  let slots = [];
  for (let i = 0; i < 48; i++) {
    let hour = Math.floor(i / 2);
    let minute = i % 2 === 0 ? "00" : "30";
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;
    slots.push({ time: `${hour}:${minute} ${ampm}`, index: i });
  }
  return slots;
}

const rows = createTimeSlots();
const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function Calendar({ events, onEdit, onDelete, onAddEvent }) {
  const currentRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const currentTimeIndex = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return hours * 2 + (minutes >= 30 ? 1 : 0);
  };

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const timeToMinutes = (time) => {
    const [h, m, ampm] = time.split(/[:\s]/);
    return (
      ((ampm === "PM" && h !== "12" ? parseInt(h, 10) + 12 : parseInt(h, 10)) %
        24) *
        60 +
      parseInt(m, 10)
    );
  };

  const preparedEvents = daysOfWeek.map((day) => {
    return rows
      .map((row) => {
        const event = events.find(
          (e) =>
            e.dayOfWeek.toUpperCase() === day.toUpperCase() &&
            timeToMinutes(e.startTime) <= timeToMinutes(row.time) &&
            timeToMinutes(row.time) < timeToMinutes(e.endTime)
        );
        if (event) {
          const startMinutes = timeToMinutes(event.startTime);
          const startRowIndex = rows.findIndex(
            (r) => timeToMinutes(r.time) === startMinutes
          );
          const endMinutes = timeToMinutes(event.endTime);
          const durationInHalfHours = (endMinutes - startMinutes) / 30;
          return { ...event, startRowIndex, durationInHalfHours };
        }
        return null;
      })
      .filter((e) => e);
  });

  const index = currentTimeIndex();

  return (
    <div
      style={{
        position: "relative",
        marginLeft: "100px",
        overflowY: "auto",
        maxHeight: "80vh",
        width: "1000px",
      }}
    >
      <Table borderAxis="both">
        <thead className="sticky-header">
          <tr>
            <th style={{ width: "10%" }}></th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.time} ref={rowIndex === index ? currentRef : null}>
              <td>{row.time}</td>
              {daysOfWeek.map((day, colIndex) => {
                const event = preparedEvents[colIndex].find(
                  (e) => e.startRowIndex === rowIndex
                );
                if (event && rowIndex === event.startRowIndex) {
                  return (
                    <td
                      key={day}
                      rowSpan={event.durationInHalfHours}
                      style={{
                        minHeight: "50px",
                        backgroundColor: event.color,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedEvent(event);
                        setEditMode(true);
                        setModalOpen(true);
                      }}
                    >
                      {event.activityName}
                    </td>
                  );
                } else if (
                  !preparedEvents[colIndex].some(
                    (e) =>
                      e.startRowIndex <= rowIndex &&
                      rowIndex < e.startRowIndex + e.durationInHalfHours
                  )
                ) {
                  return <td key={day}></td>;
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      <CalendarModal
        isOpen={modalOpen}
        onRequestClose={() => {
          setModalOpen(false);
          setSelectedEvent(null);
          setEditMode(false);
        }}
        onAddEvent={(event) => {
          onAddEvent(event);
          setModalOpen(false);
        }}
        onEditEvent={(event) => {
          onEdit(event);
          setModalOpen(false);
        }}
        onDeleteEvent={(eventId) => {
          onDelete(eventId);
          setModalOpen(false);
        }}
        editMode={editMode}
        currentEvent={selectedEvent}
      />
    </div>
  );
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      dayOfWeek: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      activityName: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddEvent: PropTypes.func.isRequired,
};
