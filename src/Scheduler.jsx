import React, { useState } from "react";
import AppointmentGrid from "./AppointmentGrid";
import AppointmentForm from "./AppointmentForm";

const initialPeople = ["John Doe", "Jane Smith", "Bob Johnson"];
const initialDays = [
  { label: "Monday", date: "2024-07-22" },
  { label: "Tuesday", date: "2024-07-23" },
  { label: "Wednesday", date: "2024-07-24" },
  { label: "Thursday", date: "2024-07-25" },
  { label: "Friday", date: "2024-07-26" },
];
const initialHours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const initialWeeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
const initialAppointments = [
  {
    id: 1,
    person: "Alice",
    datetime: "2024-07-22T09:00",
    description: "Dentist",
  },
  {
    id: 2,
    person: "Bob",
    datetime: "2024-07-22T10:00",
    description: "Meeting",
  },
];

function Scheduler() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [view, setView] = useState("days"); // default view

  const addAppointment = (appointment) => {
    setAppointments([
      ...appointments,
      {
        ...appointment,
        id: `${appointment.person}-${appointment.day}-${appointment.time}`,
      },
    ]);
  };

  return (
    <div>
      <div className="button-group">
        <button onClick={() => setView("days")}>Person on Days</button>
        <button onClick={() => setView("hours")}>Person on Hours</button>
        <button onClick={() => setView("weeks")}>Person on Weeks</button>
      </div>
      <AppointmentForm
        addAppointment={addAppointment}
        people={initialPeople}
        days={initialDays}
      />
      {view === "days" && (
        <AppointmentGrid
          appointments={appointments}
          setAppointments={setAppointments}
          people={initialPeople}
          timeUnits={initialDays}
          unitType="day"
        />
      )}
      {view === "hours" && (
        <AppointmentGrid
          appointments={appointments}
          setAppointments={setAppointments}
          people={initialPeople}
          timeUnits={initialHours}
          unitType="hour"
        />
      )}
      {view === "weeks" && (
        <AppointmentGrid
          appointments={appointments}
          setAppointments={setAppointments}
          people={initialPeople}
          timeUnits={initialWeeks}
          unitType="week"
        />
      )}
    </div>
  );
}

export default Scheduler;
