import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import calendarImage from './calendar.jpg';
import libraryImage from './library.jpg';

const Dashboard = () => {
  const [taskName, setTaskName] = useState('');
  const [studyDate, setStudyDate] = useState('');
  const [studyHour, setStudyHour] = useState('12');
  const [studyMinute, setStudyMinute] = useState('00');
  const [amPm, setAmPm] = useState('AM');
  const navigate = useNavigate();


  const logout = () => {
    // Clear any authentication state (e.g., token, user info)
    localStorage.removeItem('user');  // Example: clear user data from localStorage
    toast.info('You have been logged out.');
    navigate('/login');  // Navigate to login page after logging out
  };

  const startSession = async () => {
    if (taskName && studyDate && studyHour && studyMinute) {
      const hours = parseInt(studyHour, 10);
      const minutes = parseInt(studyMinute, 10);
      const adjustedHours = amPm === "PM" && hours !== 12 ? hours + 12 : amPm === "AM" && hours === 12 ? 0 : hours;

      const studyDateTime = `${studyDate}T${String(adjustedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

      const now = new Date();
      const selectedDateTime = new Date(studyDateTime);

      if (selectedDateTime < now) {
        toast.error("You cannot schedule a task in the past.");
      } else {
        const newTask = {
          taskName,
          studyDateTime,
          completed: false,
          id: new Date().getTime(), // Unique ID for the task (timestamp)
        };
    
        // Retrieve existing tasks from localStorage
        const tasks = JSON.parse(localStorage.getItem('studyTasks')) || [];
    
        // Add the new task to the array
        tasks.push(newTask);
    
        // Save the updated tasks array back to localStorage
        localStorage.setItem('studyTasks', JSON.stringify(tasks));
    
          toast.success(`Scheduled task: ${taskName} for ${studyDate} at ${studyHour}:${studyMinute} ${amPm}`);
          navigate("/calendar");
      }
    } else {
      toast.error("Please fill in all fields to schedule a study session.");
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">Lock In.</div>
        <nav className="nav-links">
          <div className="profile">
            {/* Door-shaped button with an arrow icon */}
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </nav>
      </header>

      {/* Content */}
      <div className="content-sections">
        {/* Calendar */}
        <section className="section-content" onClick={() => navigate('/calendar')}>
          <h2>Calendar</h2>
          <img src={calendarImage} alt="Calendar" />
          <p>Click here to view your calendar.</p>
        </section>

        {/* Library */}
        <section className="section-content" onClick={() => navigate('/library')}>
          <h2>Library</h2>
          <img src={libraryImage} alt="Library" />
          <p>Upload & manage your documents.</p>
        </section>

        {/* Study Session */}
        <section className="section-content" id="study-session">
          <h2>Plan Your Study Session</h2>
          <p>Organize your study sessions and set timers for focus.</p>
          <div className="study-session-content">
            <label htmlFor="taskName">Study Task:</label>
            <input
              type="text"
              id="taskName"
              placeholder="Enter your study task..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />

            <label htmlFor="studyDate">Select Date:</label>
            <input
              type="date"
              id="studyDate"
              value={studyDate}
              onChange={(e) => setStudyDate(e.target.value)}
            />

            <label htmlFor="studyTime">Select Time:</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                min="1"
                max="12"
                value={studyHour}
                onChange={(e) => setStudyHour(e.target.value)}
                placeholder="Hour"
              />
              <input
                type="number"
                min="0"
                max="59"
                value={studyMinute}
                onChange={(e) => setStudyMinute(e.target.value)}
                placeholder="Minute"
              />
              <select
                value={amPm}
                onChange={(e) => setAmPm(e.target.value)}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            <button id="startSessionBtn" onClick={startSession}>
              Schedule Session
            </button>
          </div>
        </section>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
