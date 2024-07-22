import React, { useState } from "react";
import AppointmentGrid from "./AppointmentGrid";
import AppointmentForm from "./AppointmentForm";

const initialPeople = ["John Doe", "Jane Smith", "Bob Johnson"];
const initialDays = [
  { label: "Monday", value: "2024-07-22" },
  { label: "Tuesday", value: "2024-07-23" },
  { label: "Wednesday", value: "2024-07-24" },
  { label: "Thursday", value: "2024-07-25" },
  { label: "Friday", value: "2024-07-26" },
];
const initialHours = Array.from({ length: 24 }, (_, i) => ({
  label: `${i}:00`,
  value: i,
}));

const initialWeeks = [
  {
    label: `Week 1`,
    minValue: `2024-07-21`,
    maxValue: `2024-07-27`,
  },
  {
    label: `Week 2`,
    minValue: `2024-07-28`,
    maxValue: `2024-08-03`,
  },
  {
    label: `Week 3`,
    minValue: `2024-08-04`,
    maxValue: `2024-08-10`,
  },
  {
    label: `Week 4`,
    minValue: `2024-08-11`,
    maxValue: `2024-08-17`,
  },
];

const initialAppointments = [
  {
    id: 1,
    person: "John Doe",
    datetime: "2024-07-22T09:00",
    description: "Dentist",
  },
  {
    id: 2,
    person: "John Doe",
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
