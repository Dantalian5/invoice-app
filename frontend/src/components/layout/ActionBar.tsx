import AddBtn from "@/components/commons/AddBtn";
import FilterBtn from "@/components/commons/FilterBtn";
function ActionBar() {
  return (
    <div className="flex items-center justify-between px-6 sm:px-12">
      <div className="w-fit">
        <h1 className="text-2xl font-bold tracking-tightest text-black-light sm:mb-[6px] sm:text-4xl sm:tracking-sm dark:text-white">
          Invoices
        </h1>
        <p className="dark:neutral-200 text-sm font-medium tracking-normal text-neutral-300">
          <span className="hidden sm:inline">There are </span>7{" "}
          <span className="hidden sm:inline">total</span> invoices
        </p>
      </div>
      <div className="flex items-center gap-5 sm:gap-10">
        <FilterBtn />
        <AddBtn />
      </div>
    </div>
  );
}
export default ActionBar;
