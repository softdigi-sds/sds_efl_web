import React, { useState } from 'react';
import './general.scss'; // Optional, for styles
import { SmartCalendarProps } from './SmartGeneralInterface';


// Get the number of days in a given month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Get the starting day of the week for a given month
const getStartDay = (year: number, month: number) => {
  return new Date(year, month,1 ).getDay();
};

const SmartCalendar: React.FC<SmartCalendarProps> = (props) => {
    const {initialYear, initialMonth, events = [] }=props
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="smart-calendar-cell smart-calendar-empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const event = events.find(e => e.date.getDate() === day && e.date.getMonth() === month && e.date.getFullYear() === year);
      cells.push(
        <div key={day} className="smart-calendar-cell">
          <div className="smart-calendar-days">{day}</div>
          {event && (
            <div className="smart-calendar-event">
              <div className="smart-calendar-time">{event.time}</div>
              <div className="smart-calendar-title">{event.title}</div>
              <div className="smart-calendar-subtitle">{event.subTitle}</div>
            </div>
          )}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="smart-calendar-container">
      <div className="smart-calendar-navigation">
        <button onClick={handlePrevMonth}>◀</button>
        <span>{new Date(year, month).toLocaleString('default', { month: 'long' })} {year}</span>
        <button onClick={handleNextMonth}>▶</button>
      </div>
      <div className="smart-calendar-header">
        <div className="smart-calendar-day">Monday</div>
        <div className="smart-calendar-day">Tuesday</div>
        <div className="smart-calendar-day">Wednesday</div>
        <div className="smart-calendar-day">Thursday</div>
        <div className="smart-calendar-day">Friday</div>
        <div className="smart-calendar-day">Saturday</div>
        <div className="smart-calendar-day">Sunday</div>
      </div>
      <div className="smart-calendar-grid">
        {renderCells()}
      </div>
    </div>
  );
};

export default SmartCalendar;
