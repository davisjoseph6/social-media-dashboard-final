import React from 'react';
import './input.css'; // Make sure you have an input.css file for styling

const Input = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="input-container">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;

