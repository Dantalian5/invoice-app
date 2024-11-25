import ThemeSwitch from "@/components/commons/ThemeSwitch";

function Navbar() {
  return (
    <div className="flex w-full items-center justify-between bg-background-neutral">
      <div className="relative w-fit overflow-hidden rounded-r-2xl bg-primary p-[22px] before:absolute before:inset-0 before:top-1/2 before:z-10 before:rounded-tl-2xl before:bg-primary-light before:content-['']">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="26"
          className="relative z-20"
        >
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
          />
        </svg>
      </div>
      <div>
        <ThemeSwitch />
      </div>
      <div></div>
    </div>
  );
}
export default Navbar;
