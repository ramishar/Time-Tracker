import React, { useState } from 'react';
import moment from 'moment';
import './Card.css'

const Card = ({ taskName, onDelete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [history, setHistory] = useState([]);

  const handleToggleTimer = () => {
    if (isRunning) {
      // Stop the timer
      const currentTime = moment();
      setStopTime(currentTime);
      setIsRunning(false);
  
      if (startTime) {
        const duration = moment.duration(currentTime.diff(startTime));
        const formattedDuration = formatDuration(duration);
        setHistory([...history, { startTime, stopTime: currentTime, duration: formattedDuration }]);
      }
    } else {
      // Start the timer
      setStartTime(moment());
      setIsRunning(true);
    }
  };
  
  const formatDuration = (duration) => {
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
      <div className="card">
      <div className="card-header">
        <p className="task-name">{taskName}</p>
        <p className="time-duration">{formatDuration(stopTime ? moment.duration(stopTime.diff(startTime)) : moment.duration())}</p>
        <button className={`timer-button ${isRunning ? 'stop' : 'start'}`} onClick={handleToggleTimer}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button className="delete-button" onClick={onDelete}>
          X
        </button>
      </div>
      <div className="card-body">
        {history.length > 0 && (
          <ul className="history-list">
            {history.map((entry, index) => (
              <li key={index}>
                <p>Started the Timer at: {entry.startTime.format('HH:mm:ss')}
                &nbsp;  & Stopped the Timer at: {entry.stopTime.format('HH:mm:ss')}
               &nbsp; Duration: {entry.duration}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Card;

