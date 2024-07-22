import React, { useState } from "react";
import Chip from "./Chip";
import Modal from "./Modal";

function AppointmentGrid({
  appointments,
  setAppointments,
  people,
  timeUnits,
  unitType,
  days,
}) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleChipClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  const handleSaveAppointment = (editedAppointment) => {
    setAppointments(
      appointments.map((appt) =>
        appt.id === editedAppointment.id ? editedAppointment : appt
      )
    );
  };

  const renderCells = (personIndex) => {
    return timeUnits.map((unit, unitIndex) => {
      const unitAppointments = appointments.filter((appt) => {
        const apptDate = new Date(appt.datetime);
        switch (unitType) {
          case "days":
            return apptDate.toDateString() === new Date(unit).toDateString();
          case "hours":
            return apptDate.getHours() === unit;
          case "weeks":
            const startOfWeek = new Date(unit);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return apptDate >= startOfWeek && apptDate <= endOfWeek;
          default:
            return false;
        }
      });
      return (
        <div key={`${personIndex}-${unitIndex}`} className="grid-cell">
          {unitAppointments.map((appt, index) => (
            <Chip
              key={appt.id}
              label={appt.description}
              datetime={appt.datetime}
              onClick={() => handleChipClick(appt)}
            />
          ))}
        </div>
      );
    });
  };

  return (
    <div className="grid-container">
      <div className="grid-wrapper">
        <div className="grid-header-container">
          <div className="grid-header">
            <div className="grid-header-cell"></div>
            {timeUnits.map((unit, index) => (
              <div key={index} className="grid-header-cell">
                {unitType === "days" && new Date(unit).toLocaleDateString()}
                {unitType === "hours" && `${unit}:00`}
                {unitType === "weeks" &&
                  `Week of ${new Date(unit).toLocaleDateString()}`}
              </div>
            ))}
          </div>
        </div>
        <div className="grid-body">
          {people.map((person, personIndex) => (
            <div key={person} className="grid-row">
              <div className="grid-row-header">{person}</div>
              {renderCells(personIndex)}
            </div>
          ))}
        </div>
      </div>
      <Modal
        appointment={selectedAppointment}
        onClose={handleCloseModal}
        onSave={handleSaveAppointment}
      />
    </div>
  );
}

export default AppointmentGrid;
