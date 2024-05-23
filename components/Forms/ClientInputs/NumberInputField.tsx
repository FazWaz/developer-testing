"use client";

import React, { FC, useCallback, useState } from "react";

interface NumberInputFieldProps {
  className: string | undefined;
  placeholder: string | undefined;
  name?: string | undefined;
  onChange?: any | undefined;
  value?: string | undefined;
  minLength?: number | undefined;
  maxLength?: number | undefined;
}
const NumberInputField: FC<NumberInputFieldProps> = ({
  className,
  placeholder,
  name,
  onChange,
  value,
  minLength,
  maxLength,
}) => {
  const handleKeyDown = (e: { target: any; preventDefault: any; key: any }) => {
    if (
      ((e.key >= minLength! || e.target.value.length >= minLength!) &&
        e.target.value.length <= 5) ||
      e.key == "Backspace"
    ) {
      return;
    }

    e.preventDefault();
  };

  return (
    <input
      type="number"
      name={name}
      placeholder={placeholder}
      className={`text-black border-none outline-none ${className}`}
      onKeyDown={handleKeyDown}
      onChange={onChange}
      value={value}
    />
  );
};

export default NumberInputField;
