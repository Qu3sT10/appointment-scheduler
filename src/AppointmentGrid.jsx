import React, { useState } from "react";
import Chip from "./Chip";
import Modal from "./Modal";

function AppointmentGrid({
  appointments,
  setAppointments,
  people,
  timeUnits,
  unitType,
}) {
  console.log("units time", timeUnits);
  console.log("unitType", unitType);
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
      const person = people[personIndex];
      const unitAppointments = appointments.filter((appt) => {
        const apptDate = new Date(appt.datetime);
        const isPersonMatch = appt.person === person;
        let isTimeMatch = false;

        switch (unitType) {
          case "day":
            isTimeMatch = apptDate.getDate() === new Date(unit.value).getDate();
            break;
          case "hour":
            isTimeMatch = apptDate.getHours() === unit.value;
            break;
          case "week":
            const weekStart = new Date(unit.minValue);
            const weekEnd = new Date(unit.maxValue);
            isTimeMatch = apptDate >= weekStart && apptDate <= weekEnd;
            break;
          default:
            isTimeMatch = false;
        }

        return isPersonMatch && isTimeMatch;
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
                {unit.label}
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
