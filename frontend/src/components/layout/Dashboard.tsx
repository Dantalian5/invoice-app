import ActionBar from "@/components/layout/ActionBar";
import StatusShield from "@/components/commons/StatusShield";
import data from "@/db/data.json";
import { formatDate, formatCurrency } from "@/lib/helpers";
import { svgArrowLeft } from "@/components/svg/SvgIcons";

function Dashboard() {
  return (
    <div className="transition-theme flex h-full w-full flex-col overflow-hidden bg-neutral-100 px-6 pt-8 sm:px-12 sm:pt-16 dark:bg-black">
      <ActionBar />
      <ul className="relative mt-4 flex w-full flex-grow flex-col overflow-hidden">
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 bg-gradient-to-b from-black to-black/0 sm:h-8"></div>
        <div className="flex w-full flex-col gap-4 overflow-scroll py-4 sm:py-10">
          {data.map((invoice) => (
            <li
              key={invoice.id}
              className="transition-theme grid w-full grid-cols-2 items-center gap-y-2 rounded-lg bg-white p-6 py-4 shadow-card md:flex dark:bg-secondary"
            >
              <h2 className="col-span-1 col-start-1 row-span-1 mb-4 w-[7ch] text-base font-bold leading-none tracking-tight text-black-light md:row-start-1 md:mb-0 md:mr-7 dark:text-white">
                <span className="text-neutral-400">#</span>
                {invoice.id}
              </h2>
              <p className="col-span-1 row-span-1 row-start-2 w-fit text-base font-medium tracking-normal text-neutral-400 sm:mr-[52px] dark:text-neutral-200">
                <span className="text-neutral-300 dark:text-neutral-200">
                  Due{" "}
                </span>
                {formatDate(invoice.paymentDue)}
              </p>
              <p className="col-span-1 col-start-2 row-span-1 w-fit self-start justify-self-end text-sm font-medium tracking-normal text-[#858bb2] md:mr-auto md:self-center dark:text-white">
                {invoice.clientName}
              </p>
              <p className="col-span-1 row-span-1 row-start-3 text-base font-bold tracking-tight text-black-light md:mr-10 dark:text-white">
                £ {formatCurrency(invoice.total)}
              </p>
              <div className="col-span-1 col-start-2 row-span-2 h-fit w-fit self-center justify-self-end md:mr-5">
                <StatusShield status={invoice.status} />
              </div>
              <span className="hidden size-fit rotate-180 md:block">
                {svgArrowLeft}
              </span>
            </li>
          ))}
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-4 bg-gradient-to-t from-black to-black/0 sm:h-8"></div>
      </ul>
    </div>
  );
}
export default Dashboard;
