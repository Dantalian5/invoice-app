import ActionBar from "@/components/layout/ActionBar";
import StatusShield from "@/components/commons/StatusShield";
import db from "@/db/data.json";
import { formatDate, formatCurrency } from "@/lib/helpers";
import { svgArrowLeft } from "@/components/svg/SvgIcons";
import emptyImg from "@/assets/illustration-empty.svg";
import { Link } from "@tanstack/react-router";

function Dashboard() {
  const data: any[] = db;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden pt-8 sm:pt-16">
      <ActionBar />
      <div className="relative mt-4 flex w-full flex-grow flex-col overflow-hidden">
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 bg-gradient-to-b from-neutral-100 to-neutral-100/0 sm:h-8 dark:from-black dark:to-black/0"></div>
        {data.length === 0 ? (
          <div className="flex flex-grow flex-col items-center justify-center overflow-scroll px-6 py-10 sm:px-12">
            <img
              src={emptyImg}
              alt="Illustration of empty dashboard"
              className="mb-11 w-[194px] sm:mb-16 sm:w-60"
            />
            <h2 className="mb-6 w-fit text-2xl font-bold tracking-tightest text-black-light dark:text-white">
              There is nothing here
            </h2>
            <p className="mb-10 w-fit text-sm font-medium text-neutral-300 dark:text-neutral-200">
              Create a new invoice by clicking the <br />
              <span className="font-bold"> New Invoice </span>
              button and get started
            </p>
          </div>
        ) : (
          <ul className="flex w-full flex-col gap-4 overflow-scroll px-6 py-4 sm:px-12 sm:py-10">
            {data.map((invoice) => (
              <li key={invoice.id} className="w-full">
                <Link
                  to={`/dashboard/${invoice.id}`}
                  className="transition-theme grid w-full cursor-pointer grid-cols-2 items-center gap-y-2 rounded-lg bg-white p-6 py-4 shadow-card hover:ring-1 hover:ring-primary md:flex dark:bg-secondary"
                >
                  <h2 className="col-span-1 col-start-1 row-span-1 mb-4 w-[7ch] text-base font-bold leading-none tracking-tight text-black-light md:row-start-1 md:mb-0 md:mr-7 dark:text-white">
                    <span className="text-neutral-400">#</span>
                    {invoice.id}
                  </h2>
                  <p className="col-span-1 row-span-1 row-start-2 w-fit text-base font-medium tracking-normal text-neutral-400 md:mr-[52px] dark:text-neutral-200">
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
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-4 bg-gradient-to-t from-neutral-100 to-neutral-100/0 sm:h-8 dark:from-black dark:to-black/0"></div>
      </div>
    </div>
  );
}
export default Dashboard;
