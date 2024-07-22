import { useState, useEffect } from "react";

function Modal({ appointment, onClose, onSave, people }) {
  const [person, setPerson] = useState(appointment?.person);
  const [datetime, setDatetime] = useState(appointment?.datetime);
  const [description, setDescription] = useState(appointment?.description);

  useEffect(() => {
    if (appointment) {
      setPerson(appointment.person);
      setDatetime(appointment.datetime);
      setDescription(appointment.description);
    }
  }, [appointment]);

  if (!appointment) return null;

  const handleSave = () => {
    const editableAppointment = {
      id: appointment.id,
      person,
      datetime,
      description,
    };
    onSave(editableAppointment);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Appointment</h2>
        <form>
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
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
