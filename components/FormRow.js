import React from "react";

const FormRow = ({ name, placeholder, onChange, type, value }) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      value={value}
      className="p-2 rounded-sm w-full outline-none text-black "
    />
  );
};

export default FormRow;
