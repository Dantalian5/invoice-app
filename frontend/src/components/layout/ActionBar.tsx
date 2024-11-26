import AddBtn from "@/components/commons/AddBtn";
import FilterBtn from "@/components/commons/FilterBtn";
function ActionBar() {
  return (
    <div className="flex items-center justify-between py-8">
      <div className="w-fit">
        <h1 className="text-2xl font-bold tracking-tightest text-black-light dark:text-white">
          Invoices
        </h1>
        <p className="dark:neutral-200 text-sm font-medium tracking-normal text-neutral-300">
          7 invoices
        </p>
      </div>
      <div className="flex items-center gap-5">
        <FilterBtn />
        <AddBtn />
      </div>
    </div>
  );
}
export default ActionBar;
