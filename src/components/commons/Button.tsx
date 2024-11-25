interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "dark";
  isFullWidth?: boolean;
}

function Button({
  children,
  className,
  variant = "primary",
  isFullWidth = false,
  ...props
}: ButtonProps) {
  let classColor;
  switch (variant) {
    case "primary":
      classColor = "bg-primary text-white hover:bg-primary-light";
      break;
    case "secondary":
      classColor =
        "bg-[#f9fafe] text-neutral-400 hover:bg-neutral-200 dark:bg-secondary-light dark:text-neutral-200 dark:hover:bg-white";
      break;
    case "danger":
      classColor = "bg-danger text-white hover:bg-danger-light";
      break;
    case "dark":
      classColor =
        "bg-neutral-500 text-neutral-300 hover:bg-black-light dark:text-neutral-200 dark:hover:bg-secondary";
      break;
    default:
      classColor = "bg-primary text-white";
  }
  const classWidth = isFullWidth ? "w-full" : "w-fit";
  const classes = [classColor, className, classWidth].join(" ");
  return (
    <button
      className={
        classes +
        " " +
        "rounded-full bg-primary px-6 py-[1.125rem] text-base font-bold leading-none tracking-tight"
      }
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
