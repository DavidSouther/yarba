import { FC } from "react";

const ErrorMessage: FC<{ err: Error }> = ({ err: { name, message } }) => (
  <div className="bg-red-100">
    <span className="font-bold pr-4">{name}:</span>
    <span>{message}</span>
  </div>
);

export default ErrorMessage;
