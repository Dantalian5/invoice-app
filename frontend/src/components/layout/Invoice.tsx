import { useParams, Link } from "@tanstack/react-router";
import { svgArrowLeft } from "@/components/svg/SvgIcons";
import StatusShield from "@/components/commons/StatusShield";
import db from "@/db/data.json";

function Invoice() {
  const { id } = useParams({ strict: false });

  const invoice: any = db.find((invoice) => invoice.id === id);

  return (
    <div className="relative flex w-full flex-grow flex-col">
      <div className="w-full px-6 py-8">
        <Link
          to="/dashboard"
          className="flex items-center gap-6 text-base font-bold leading-none tracking-tight text-black-light dark:text-white"
        >
          <span>{svgArrowLeft}</span>Go back
        </Link>
      </div>
      <div className="w-full flex-grow overflow-hidden">
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 bg-gradient-to-b from-neutral-100 to-neutral-100/0 sm:h-8 dark:from-black dark:to-black/0"></div>
        <div className="overflow-scroll px-6">
          <div className="transition-theme mb-4 flex w-full items-center gap-5 rounded-lg bg-white p-6 shadow-card dark:bg-secondary">
            <p className="mr-auto text-sm font-medium tracking-normal text-[#858bb2] dark:text-neutral-200">
              Status
            </p>
            <StatusShield status={invoice.status} />
          </div>
          <div className="transition-theme flex flex-wrap gap-x-[60px] gap-y-[30px] rounded-lg bg-white p-6 dark:bg-secondary">
            <div className="w-full text-left">
              <h2 className="mb-1 text-base leading-none tracking-tight text-black-light dark:text-white">
                <span className="text-neutral-400">#</span>
                {invoice.id}
              </h2>
              <p className="text-sm tracking-normal text-neutral-400 dark:text-neutral-200">
                {invoice.description}
              </p>
            </div>
            <p
              className="w-full text-left text-sm leading-[18px] tracking-normal text-neutral-400 dark:text-neutral-200"
              aria-label="Sender Address"
            >
              {invoice.senderAddress.street} <br />
              {invoice.senderAddress.city} <br />
              {invoice.senderAddress.postCode} <br />
              {invoice.senderAddress.country}
            </p>
            <div className="flex flex-grow flex-col gap-[30px]">
              <p
                className="text-base font-bold tracking-tight text-black-light dark:text-white"
                aria-label="Invoice Date"
              >
                <span className="mb-[1ch] block text-sm font-medium text-neutral-400 dark:text-neutral-200">
                  Invoice Date
                </span>
                {invoice.createdAt}
              </p>
              <p
                className="text-base font-bold tracking-tight text-black-light dark:text-white"
                aria-label="Payment Due"
              >
                <span className="mb-[1ch] block text-sm font-medium text-neutral-400 dark:text-neutral-200">
                  Payment Due
                </span>
                {invoice.paymentDue}
              </p>
            </div>
            <p
              className="flex-grow text-sm font-medium tracking-normal text-neutral-400 dark:text-neutral-200"
              aria-label="Billed to"
            >
              <span className="mb-[1ch] block">Billed to</span>
              <span className="mb-2 block text-base font-bold tracking-tight text-black-light dark:text-white">
                {invoice.clientName}
              </span>
              <span className="leading-[18px]">
                {invoice.clientAddress.street}
                <br />
                {invoice.clientAddress.city}
                <br />
                {invoice.clientAddress.postCode}
                <br />
                {invoice.clientAddress.country}
              </span>
            </p>
            <p
              className="w-full text-base font-bold tracking-tight text-black-light dark:text-white"
              aria-label="Send To"
            >
              <span className="mb-[1ch] block text-sm font-medium text-neutral-400 dark:text-neutral-200">
                Send to
              </span>
              {invoice.clientEmail}
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-4 bg-gradient-to-t from-neutral-100 to-neutral-100/0 sm:h-8 dark:from-black dark:to-black/0"></div>
      </div>
    </div>
  );
}
export default Invoice;
