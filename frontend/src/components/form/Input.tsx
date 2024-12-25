import { forwardRef } from "react";
interface InputProps extends React.ComponentPropsWithRef<"input"> {
  name: string;
  label: string;
  className?: string;
  isError?: boolean;
  errorMessage?: string;
}

function Input(
  {
    name,
    label,
    className,
    isError = false,
    errorMessage,
    ...props
  }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <label
      className={`${className} ${isError ? "text-danger" : "text-neutral-400"} text-sm font-medium tracking-normal`}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <span className="flex w-full items-center justify-between">
        {label}
        {isError && <span role="alert">{errorMessage}</span>}
      </span>
      <input
        ref={ref}
        className={`${isError ? "border-danger" : "border-neutral-200 focus:border-primary dark:border-secondary-light"} mt-2 block w-full rounded-[4px] border bg-white bg-none px-5 py-4 text-base font-bold leading-none tracking-tight text-black-light focus:outline-none dark:bg-secondary dark:text-white`}
        name={name}
        {...props}
      />
    </label>
  );
}
export default forwardRef(Input);
