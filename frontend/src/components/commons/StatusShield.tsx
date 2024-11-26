interface Props {
  status: string;
}

const circle = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
  >
    <circle cx="4" cy="4" r="4" fill="currentColor" />
  </svg>
);

function StatusShield({ status }: Props) {
  let colors = "";

  switch (status) {
    case "paid":
      colors = "bg-paid/5 text-paid";
      break;
    case "pending":
      colors = "bg-pending/5 text-pending";
      break;
    case "draft":
      colors = "bg-neutral-200/5 text-neutral-200";
      break;
    default:
      break;
  }

  return (
    <div
      className={`flex w-fit min-w-[6.5rem] items-center justify-center gap-2 rounded-md px-3 pb-[0.75rem] pt-[0.875rem] text-base font-bold capitalize leading-none tracking-tight ${colors}`}
    >
      {circle}
      {status}
    </div>
  );
}
export default StatusShield;
