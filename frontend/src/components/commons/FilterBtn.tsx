import { useState } from "react";
import { svgArrowDown, svgCheck } from "@/components/svg/SvgIcons";
import {
  type Filter,
  useFilterStore as useFilter,
} from "@/stores/filter.store";

function FilterBtn() {
  const [isFilterSelectorShown, setIsFilterSelectorShown] = useState(false);
  const filters = useFilter((state) => state.filters);
  const toggleFilter = useFilter((state) => state.toggleFilter);
  const filterArray: { name: string; value: Filter }[] = [
    { name: "Draft", value: "draft" },
    { name: "Pending", value: "pending" },
    { name: "Paid", value: "paid" },
  ];

  const toggleFilterSelectorShown = () => {
    setIsFilterSelectorShown(!isFilterSelectorShown);
  };

  return (
    <div className="relative w-fit">
      <button
        onClick={toggleFilterSelectorShown}
        className="flex items-center text-base font-bold tracking-tight text-black-light dark:text-white"
      >
        <span>
          Filter
          <span className="hidden sm:inline"> by status</span>
        </span>
        <span
          className={
            "ml-3 h-fit w-fit text-primary transition-transform" +
            (isFilterSelectorShown ? " rotate-180" : "")
          }
        >
          {svgArrowDown}
        </span>
      </button>
      {isFilterSelectorShown && (
        <div className="absolute right-1/2 top-out z-50 flex w-fit min-w-48 translate-x-1/2 flex-col gap-4 rounded-lg bg-white p-6 dark:bg-secondary-light">
          {filterArray.map((filter) => (
            <label
              key={filter.value}
              className="group flex cursor-pointer items-center gap-[0.8125rem]"
            >
              <input
                onChange={() => toggleFilter(filter.value)}
                type="checkbox"
                className="peer sr-only"
                checked={filters.includes(filter.value)}
              />
              <span className="flex size-4 items-center justify-center rounded-sm bg-neutral-200 text-white *:hidden group-hover:ring-2 group-hover:ring-primary peer-checked:bg-primary peer-checked:*:block peer-focus:ring-2 peer-focus:ring-primary peer-focus:peer-checked:ring-primary-light dark:bg-secondary">
                {svgCheck}
              </span>
              <span className="text-base font-bold tracking-tight text-secondary dark:text-white">
                {filter.name}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
export default FilterBtn;
