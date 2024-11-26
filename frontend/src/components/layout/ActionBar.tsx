import AddButton from "@/components/commons/AddButton";
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
      <div>
        <AddButton />
      </div>
    </div>
  );
}
export default ActionBar;
