import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./Calendar.css";

const Calendar = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [actionModal, setActionModal] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("studyTasks")) || [];
    const calendarEvents = savedTasks.map((task) => ({
      title: task.completed ? `✅ ${task.taskName}` : task.taskName,
      start: task.studyDateTime,
      color: task.completed ? "#7B9F7F" : "#567C8D",
      id: task.id,
      completed: task.completed || false,
    }));
    setEvents(calendarEvents);
  }, []);

  const showTimerModal = (taskTitle) => {
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    const modalBox = document.createElement("div");
    modalBox.className = "modal-box";

    const modalTitle = document.createElement("h3");
    modalTitle.textContent = `Set Timer for "${taskTitle}"`;
    modalTitle.className = "modal-title";

    const inputContainer = document.createElement("div");
    inputContainer.style.display = "flex";
    inputContainer.style.justifyContent = "center";
    inputContainer.style.gap = "10px";

    const hoursInput = document.createElement("input");
    hoursInput.type = "number";
    hoursInput.placeholder = "HH";
    hoursInput.className = "timer-input";
    hoursInput.max = 12;
    hoursInput.min = 0;

    const minutesInput = document.createElement("input");
    minutesInput.type = "number";
    minutesInput.placeholder = "MM";
    minutesInput.className = "timer-input";
    minutesInput.max = 59;
    minutesInput.min = 0;

    const secondsInput = document.createElement("input");
    secondsInput.type = "number";
    secondsInput.placeholder = "SS";
    secondsInput.className = "timer-input";
    secondsInput.max = 59;
    secondsInput.min = 0;

    inputContainer.appendChild(hoursInput);
    inputContainer.appendChild(minutesInput);
    inputContainer.appendChild(secondsInput);

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Set Timer";
    confirmBtn.className = "confirm-btn";

    confirmBtn.onclick = function () {
      const hours = hoursInput.value || 0;
      const minutes = minutesInput.value || 0;
      const seconds = secondsInput.value || 0;

      const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

      if (totalSeconds > 0) {
        navigate(`/split-screen?task=${encodeURIComponent(taskTitle)}&time=${totalSeconds}`);
        document.body.removeChild(modalOverlay);
      } else {
        alert("Please set a valid timer!");
      }
    };

    modalBox.appendChild(modalTitle);
    modalBox.appendChild(inputContainer);
    modalBox.appendChild(confirmBtn);
    modalOverlay.appendChild(modalBox);
    document.body.appendChild(modalOverlay);

    modalOverlay.onclick = function (e) {
      if (e.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    };
  };

  const handleEventClick = (info) => {
    setActionModal({
      taskId: info.event.id,
      taskTitle: info.event.title,
    });
  };

  const handleActionModalAction = (action) => {
    if (!actionModal) return;

    const taskId = actionModal.taskId;

    const savedTasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

    switch (action) {
      case "startSession":
        showTimerModal(actionModal.taskTitle.replace("✅ ", ""));
        break;

      case "markCompleted":
        const updatedTasks = savedTasks.map((task) => {
          if (String(task.id) === String(taskId)) {
            task.completed = true;
          }
          return task;
        });

        localStorage.setItem("studyTasks", JSON.stringify(updatedTasks));

        const updatedCalendarEvents = updatedTasks.map((task) => ({
          id: task.id,
          title: task.completed ? `✅ ${task.taskName}` : task.taskName,
          start: task.studyDateTime,
          color: task.completed ? "#7B9F7F" : "#567C8D",
        }));

        setEvents(updatedCalendarEvents);
        break;

      case "delete":
        const remainingTasks = savedTasks.filter((task) => String(task.id) !== String(taskId));
        const filteredEvents = events.filter((event) => String(event.id) !== String(taskId));

        localStorage.setItem("studyTasks", JSON.stringify(remainingTasks));
        setEvents(filteredEvents);
        break;

      default:
        break;
    }

    setActionModal(null);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>My Calendar</h1>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
      <div id="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
          contentHeight="auto"
          aspectRatio={1.5}
          events={events}
          eventClick={handleEventClick}
          eventContent={(info) => {
            let title = info.event.title;
            if (title.length > 20) {
              title = title.substring(0, 20) + "...";
            }
            return { html: title };
          }}
        />
      </div>

      {actionModal && (
        <div className="modal-overlay" onClick={() => setActionModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">
              Options for "{actionModal.taskTitle.replace("✅ ", "")}"
            </h3>
            <div className="modal-actions">
              <button
                onClick={() => handleActionModalAction("startSession")}
                className="action-btn start-session-btn"
              >
                Start Session
              </button>
              <button
                onClick={() => handleActionModalAction("markCompleted")}
                className="action-btn mark-completed-btn"
              >
                ✅ Mark as Completed
              </button>
              <button
                onClick={() => handleActionModalAction("delete")}
                className="action-btn delete-btn"
              >
                🗑️ Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
