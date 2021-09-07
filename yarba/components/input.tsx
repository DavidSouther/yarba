import { FC } from "react";

const Input: FC<{
  name: string;
  type?: "number" | "text";
  placeholder?: string;
  label: string;
}> = ({ name, placeholder = "", type = "text", label }) => {
  return (
    <div className="col-span-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
