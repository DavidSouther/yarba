import { FC, FormEventHandler } from "react";
import ShowError from "./error";

const Form: FC<{
  onSubmit: FormEventHandler<HTMLFormElement>;
  action?: string;
  err?: Error;
  label?: string;
}> = ({ onSubmit, children, action = "", label = "Save", err }) => {
  const doOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <form action="#{action}" onSubmit={doOnSubmit}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="grid grid-cols-6 gap-6">{children}</div>
        </div>
        {err && <ShowError err={err} />}
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {label}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
