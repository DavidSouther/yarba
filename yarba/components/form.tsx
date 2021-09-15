import {
  ChangeEvent,
  FC,
  FormEventHandler,
  createContext,
  useState,
} from "react";
import ShowError from "./error";

interface FormController {
  input(
    name: string
  ): (input: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value(name: string, def?: string): string;
}

export const FormContext = createContext<FormController>({
  input(name: string) {
    return (input: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      undefined;
  },
  value(name: string, def = "") {
    return def;
  },
});

interface FormData {
  isSubmitting: boolean;
  data: Record<string, string>;
}

const Form: FC<{
  onSubmit: (data: Record<string, string>) => void;
  action?: string;
  err?: Error;
  label?: string;
}> = ({ onSubmit, children, action = "", label = "Save", err }) => {
  const [state, setState] = useState<FormData>({
    isSubmitting: false,
    data: {},
  });

  const doOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(state.data);
  };

  const formController: FormController = {
    input(name: string) {
      return (input) => {
        setState({
          data: { ...state.data, [name]: input.target.value },
          isSubmitting: state.isSubmitting,
        });
      };
    },
    value(name: string, def = "") {
      return state.data[name] ?? def;
    },
  };

  return (
    <form action={`#${action}`} onSubmit={doOnSubmit}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <FormContext.Provider value={formController}>
              {children}
            </FormContext.Provider>
          </div>
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
