import { useEffect, useState } from "react";
import { getDay } from "date-fns";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CircleIcon from '@mui/icons-material/Circle';
import PropTypes from "prop-types";

const daysOfWeek = [
  "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"
];

const isPastEvent = (startTime, endTime) => {
  const now = new Date();
  const eventStart = new Date(now);
  const eventEnd = new Date(now);
  const [startHour, startMinute, startPeriod] = startTime.split(/[:\s]/);
  const [endHour, endMinute, endPeriod] = endTime.split(/[:\s]/);

  eventStart.setHours(startPeriod === 'PM' && startHour !== '12' ? parseInt(startHour) + 12 : parseInt(startHour));
  eventStart.setMinutes(parseInt(startMinute));

  eventEnd.setHours(endPeriod === 'PM' && endHour !== '12' ? parseInt(endHour) + 12 : parseInt(endHour));
  eventEnd.setMinutes(parseInt(endMinute));

  return now > eventEnd;
};

export default function DaySchedule({ events }) {
  const todayIndex = getDay(new Date());
  const todayName = daysOfWeek[todayIndex];

  const [todayEvents, setTodayEvents] = useState([]);
  const [checkedEvents, setCheckedEvents] = useState([]);

  useEffect(() => {
    console.log(`events:`, events);
    const filteredEvents = events.filter((event) => {
      return event.dayOfWeek === todayName;
    });
    setTodayEvents(filteredEvents);
    setCheckedEvents(filteredEvents.map(event => isPastEvent(event.startTime, event.endTime)));
  }, [events, todayName]);

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {todayName}
        </Typography>
        <List>
          {todayEvents.map((event, index) => (
            <ListItem key={index} secondaryAction={
              checkedEvents[index] ? <CheckBoxIcon sx={{color: "#666666"}}/> : <CheckBoxOutlineBlankIcon sx={{color: "#666666"}}/>
            }>
              <CircleIcon sx={{ mr: 1, color: event.color }} />
              <ListItemText 
                primary={event.activityName} 
                sx={{ textDecoration: checkedEvents[index] ? 'line-through' : 'none' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

DaySchedule.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      dayOfWeek: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      activityName: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};
