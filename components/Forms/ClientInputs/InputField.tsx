"use client";

import React, { FC, useCallback, useState } from "react";

interface InputFieldProps {
  className: string | undefined;
  placeholder: string | undefined;
  name: string | undefined;
  onChange?: any | undefined;
  value?: string | undefined;
}
const InputField: FC<InputFieldProps> = ({
  className,
  placeholder,
  name,
  onChange,
  value,
}) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      className={`text-black border-none outline-none ${className}`}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputField;
