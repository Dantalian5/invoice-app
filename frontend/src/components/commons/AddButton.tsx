function AddButton({ ...props }: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className="flex w-fit items-center gap-2 rounded-full bg-primary py-[6px] pl-[6px] pr-4 text-base font-bold text-white hover:bg-primary-light"
      {...props}
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-white">
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
            fill="#7C5DFA"
            fill-rule="nonzero"
          />
        </svg>
      </span>
      New
      <span className="hidden sm:inline">Invoice</span>
    </button>
  );
}
export default AddButton;
