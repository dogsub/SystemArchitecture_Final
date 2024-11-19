import { useState, useEffect } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

Modal.setAppElement("#root");

export default function CalendarModal({
  isOpen,
  onRequestClose,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  editMode,
  currentEvent,
}) {
  const [activityName, setActivityName] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (editMode && currentEvent) {
      setActivityName(currentEvent.activityName);
      setDayOfWeek(currentEvent.dayOfWeek);
      setStartTime(convertToTimeInputFormat(currentEvent.startTime));
      setEndTime(convertToTimeInputFormat(currentEvent.endTime));
      setColor(currentEvent.color);
    } else {
      setActivityName("");
      setDayOfWeek("");
      setStartTime("");
      setEndTime("");
      setColor("#000000");
    }
  }, [editMode, currentEvent]);

  const convertToTimeInputFormat = (time) => {
    const [h, m, ampm] = time.split(/[:\s]/);
    let hours = parseInt(h, 10);
    if (ampm === "PM" && hours !== 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${m}`;
  };

  const handleSubmit = () => {
    const newEvent = {
      id: currentEvent ? currentEvent.id : Date.now(), // id 설정
      activityName,
      dayOfWeek,
      startTime: formatTimeForDisplay(startTime),
      endTime: formatTimeForDisplay(endTime),
      color,
    };
    if (editMode) {
      onEditEvent(newEvent);
    } else {
      onAddEvent(newEvent);
    }
    onRequestClose();
  };

  const handleDelete = () => {
    if (currentEvent) {
      onDeleteEvent(currentEvent.id);
      onRequestClose();
    }
  };

  const formatTimeForDisplay = (time) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={editMode ? "Edit Event" : "Add Event"}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 10,
        },
        content: {
          zIndex: 11,
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{editMode ? "Edit Event" : "Add Event"}</h2>
        <IconButton onClick={onRequestClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Title"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="day-label">Day</InputLabel>
        <Select
          labelId="day-label"
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
        >
          {[
            "MON",
            "TUE",
            "WED",
            "THU",
            "FRI",
            "SAT",
            "SUN",
          ].map((d, index) => (
            <MenuItem key={index} value={d}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Start Time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="End Time"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Color"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {editMode ? "Save Changes" : "Add Event"}
        </Button>
        {editMode ? (
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        ) : (
          <Button variant="outlined" color="secondary" onClick={onRequestClose}>
            Cancel
          </Button>
        )}
      </div>
    </Modal>
  );
}

CalendarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onAddEvent: PropTypes.func.isRequired,
  onEditEvent: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired, // 새로운 prop 추가
  editMode: PropTypes.bool,
  currentEvent: PropTypes.shape({
    id: PropTypes.number,
    dayOfWeek: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    activityName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
};
