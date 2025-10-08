"use client";
import React from "react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  type?: string;
};

export default function InputField({
  label,
  type="text",
  value,
  onChange,
  error,
  disabled = false,
}: InputFieldProps) {
  return (
    <div>
      <label className="block font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}