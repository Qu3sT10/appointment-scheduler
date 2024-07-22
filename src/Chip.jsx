import React from 'react';

function Chip({ label, time, onClick }) {
    return (
      <div className="chip" onClick={onClick}>
        <span className="chip-label">{label}</span>
        <span className="chip-time">{time}</span>
      </div>
    );
  }

export default Chip;