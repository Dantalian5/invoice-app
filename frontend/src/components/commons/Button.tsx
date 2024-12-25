interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "dark";
  size?: "sm" | "md" | "lg";
}

function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  let classColor;
  let classSize;
  switch (variant) {
    case "primary":
      classColor = "bg-primary text-white hover:bg-primary-light";
      break;
    case "secondary":
      classColor =
        "bg-[#f9fafe] text-neutral-400 hover:bg-neutral-200 dark:bg-secondary-light dark:text-neutral-200 dark:hover:bg-white dark:hover:text-neutral-400";
      break;
    case "danger":
      classColor = "bg-danger text-white hover:bg-danger-light";
      break;
    case "dark":
      classColor =
        "bg-neutral-500 text-neutral-300 hover:bg-black-light dark:text-neutral-200 dark:hover:bg-secondary";
      break;
    default:
      classColor = "bg-primary text-white hover:bg-primary-light";
  }
  switch (size) {
    case "sm":
      classSize = "w-fit px-3 py-4 sm:px-6";
      break;
    case "md":
      classSize = "w-fit px-6 py-[1.125rem]";
      break;
    case "lg":
      classSize = "w-full px-6 py-[1.125rem]";
      break;
    default:
      classSize = "px-6 py-[1.125rem]";
  }
  const classes = [classColor, className, classSize].join(" ");
  return (
    <button
      className={
        classes +
        " " +
        "min-w-fit rounded-full text-base font-bold leading-none tracking-tight"
      }
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
