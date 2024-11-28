interface InputProps extends React.ComponentPropsWithRef<"input"> {
  name: string;
}

function Input({ name, ...props }: InputProps) {
  return <input name={name} {...props} />;
}
export default Input;
