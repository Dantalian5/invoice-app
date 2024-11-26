import { svgPlus } from "@/components/svg/SvgIcons";

function AddBtn({ ...props }: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className="flex w-fit items-center gap-2 rounded-full bg-primary py-[6px] pl-[6px] pr-4 text-base font-bold text-white hover:bg-primary-light"
      {...props}
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-white text-primary">
        {svgPlus}
      </span>
      New
      <span className="hidden sm:inline">Invoice</span>
    </button>
  );
}
export default AddBtn;