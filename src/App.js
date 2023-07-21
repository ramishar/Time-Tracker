import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css';
import logoSvg from './logo.svg'
import Card from './Card';
import './Card.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [totalTime, setTotalTime] = useState(moment.duration(0));
  const [taskName, setTaskName] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const deleteTask = (index) => {
    const deletedTask = tasks[index];
    const taskDuration = deletedTask.duration;
    // setTotalTime(totalTime - taskDuration);
    const updatedTotalTime = moment.duration(totalTime).subtract(taskDuration);
  setTotalTime(updatedTotalTime);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleAddTask = () => {
    setShowPopup(true);
  };

  const handleSaveTask = () => {
    if (taskName.trim() !== '') {
      const newTask = {
        taskName: taskName,
        duration: moment.duration(0),
      };
      setTasks([...tasks, newTask]);
    setShowPopup(false);
    setTaskName('');
    }
  };

  const handleUpdateTaskDuration = (index, newDuration) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].duration = moment.duration(newDuration);
    setTasks(updatedTasks);
    setTotalTime(calculateTotalTime(updatedTasks));
  };

  const calculateTotalTime = (tasks) => {
    let totalDuration = moment.duration(0);
    tasks.forEach((task) => {
      totalDuration.add(task.duration);
    });
    return totalDuration;
  };

  useEffect(() => {

   const totalTime = calculateTotalTime(tasks);
   setTotalTime(totalTime);
  }, [tasks]);

  const formatDuration = (duration) => {
    const hours = Math.floor(duration.asHours()).toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };


  return (
    <div className="App">
      <header className='header'>
    <img src={logoSvg} alt="Logo" className='logo' />
    <h2 id="total-time" className='total-time'>Total Time Spent: {formatDuration(totalTime)}</h2>

</header>
      {!showPopup ? (
          <div className="add" onClick={handleAddTask}>
            <div className="add-task">
              <div className="add-symbol">+</div>
            </div>
          </div>
        ) : (
          <div className="popup-rectangle" >
          <img
            className="img"
            alt="Rectangle"
            src="https://generation-sessions.s3.amazonaws.com/737050be4e450071d1ba7ead7dedf30b/img/rectangle-6.png"
          />
          <div className="popup-label">Enter the Task Name</div>
              <button className="save-button" onClick={handleSaveTask}>Save</button>
          <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div> )}
      
          {tasks.length>0 && (
      <div className="card">
        {tasks.map((task, index) => (
          <Card 
          key={index} 
          taskName={task.taskName} 
          duration={task.duration}
          onUpdateDuration={(newDuration) => handleUpdateTaskDuration(index, newDuration)}
          onDelete={() => deleteTask(index)} 
          />
        ))}
      </div>
          )}
    </div>
  );
};

export default App;


