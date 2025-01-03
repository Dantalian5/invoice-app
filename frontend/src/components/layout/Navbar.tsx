import ThemeSwitch from "@/components/commons/ThemeSwitch";
import User from "@/components/commons/User";

function Navbar() {
  return (
    <div className="transition-theme relative z-50 flex w-full items-stretch justify-between bg-neutral-500 lg:w-fit lg:flex-col lg:rounded-r-[20px] dark:bg-secondary">
      <div className="relative flex size-[72px] items-center justify-center overflow-hidden rounded-r-2xl bg-primary p-[22px] before:absolute before:inset-0 before:top-1/2 before:z-10 before:rounded-tl-2xl before:bg-primary-light before:content-[''] sm:size-20 lg:size-[102px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 28 26"
          className="relative z-20 text-[28px] lg:w-10 lg:text-[40px]"
        >
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
          />
        </svg>
      </div>
      <div className="lg:py lg flex items-center gap-6 px-6 lg:flex-col lg:px-0 lg:py-6">
        <ThemeSwitch />
        <div className="h-full w-px bg-neutral-600 lg:h-px lg:w-full" />
        <User />
      </div>
    </div>
  );
}
export default Navbar;
