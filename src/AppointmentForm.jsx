import React, { useState } from "react";

function AppointmentForm({ addAppointment, people, days }) {
  const [person, setPerson] = useState(people[0]);
  const [datetime, setDatetime] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = {
      person,
      datetime,
      description,
    };
    addAppointment(appointment);
    setDatetime(null);
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Schedule an Appointment</h2>
      <label>
        Person:
        <select value={person} onChange={(e) => setPerson(e.target.value)}>
          {people.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Date and Time:
        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Add Appointment</button>
    </form>
  );
}

export default AppointmentForm;
