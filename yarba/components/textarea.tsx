import { FormContext } from "components/form";
import { FC, useContext } from "react";

const Textarea: FC<{
  label: string;
  name: string;
  description?: string;
  rows?: number;
  placeholder?: string;
}> = ({ label, name, description, rows = 3, placeholder }) => {
  const formController = useContext(FormContext);

  return (
    <div className="col-span-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          name={name}
          rows={rows}
          value={formController.value(name)}
          onChange={formController.input(name)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder={placeholder}
        ></textarea>
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default Textarea;
