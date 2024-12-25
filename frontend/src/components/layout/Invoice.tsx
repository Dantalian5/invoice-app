import { useParams, Link } from "@tanstack/react-router";
import { svgArrowLeft } from "@/components/svg/SvgIcons";
import StatusShield from "@/components/commons/StatusShield";
import Button from "@/components/commons/Button";
import { formatCurrency } from "@/lib/helpers";
import db from "@/db/data.json";
import { useInvoice } from "@/components/context/InvoiceContext";

function Invoice() {
  const { openForm } = useInvoice();
  const { id } = useParams({ strict: false });

  const invoice: any = db.find((invoice) => invoice.id === id);

  return (
    <div className="relative flex size-full flex-col overflow-hidden pt-8 sm:pt-12 lg:pt-[65px]">
      <div className="mb-4 w-full px-6 sm:px-10">
        <Link
          to="/dashboard"
          className="flex items-center gap-6 text-base font-bold leading-none tracking-tight text-black-light dark:text-white"
        >
          <span className="mb-1">{svgArrowLeft}</span>Go back
        </Link>
      </div>
      <div className="relative flex w-full flex-grow flex-col overflow-hidden pb-[100px] sm:pb-0">
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 bg-gradient-to-b from-neutral-100 to-neutral-100/0 dark:from-black dark:to-black/0"></div>
        <div className="w-full overflow-scroll px-6 pb-10 pt-4 sm:px-10">
          <div className="transition-theme mb-4 flex w-full items-center justify-between gap-5 rounded-lg bg-white p-6 shadow-card sm:mb-6 sm:px-8 sm:py-5 dark:bg-secondary">
            <p className="text-sm font-medium tracking-normal text-[#858bb2] dark:text-neutral-200">
              Status
            </p>
            <StatusShield status={invoice.status} />
            <div className="transition-theme absolute bottom-0 left-0 right-0 z-20 flex flex-wrap items-center justify-end gap-2 bg-white px-6 py-5 sm:relative sm:ml-auto sm:p-0 dark:bg-secondary">
              <Button
                onClick={() => {
                  openForm("edit", invoice);
                }}
                variant="secondary"
              >
                Edit
              </Button>
              <Button variant="danger" className="ml-auto">
                Delete
              </Button>
              <Button variant="primary">Mark as Paid</Button>
            </div>
          </div>
          <div className="transition-theme flex flex-wrap gap-x-[60px] gap-y-[30px] rounded-lg bg-white p-6 sm:p-8 dark:bg-secondary">
            <div className="flex w-full flex-wrap justify-between gap-4">
              <div className="w-full text-left sm:w-fit">
                <h2 className="mb-1 text-base leading-none tracking-tight text-black-light dark:text-white">
                  <span className="text-neutral-400">#</span>
                  {invoice.id}
                </h2>
                <p className="text-sm tracking-normal text-neutral-400 dark:text-neutral-200">
                  {invoice.description}
                </p>
              </div>
              <p
                className="w-full text-left text-sm leading-[18px] tracking-normal text-neutral-400 sm:w-fit sm:text-right dark:text-neutral-200"
                aria-label="Sender Address"
              >
                {invoice.senderAddress.street} <br />
                {invoice.senderAddress.city} <br />
                {invoice.senderAddress.postCode} <br />
                {invoice.senderAddress.country}
              </p>
            </div>
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
              className="w-full flex-grow text-base font-bold tracking-tight text-black-light sm:w-fit dark:text-white"
              aria-label="Send To"
            >
              <span className="mb-3 block text-sm font-medium text-neutral-400 dark:text-neutral-200">
                Send to
              </span>
              {invoice.clientEmail}
            </p>
            <div className="mt-2 w-full overflow-hidden rounded-lg">
              <div className="transition-theme flex w-full flex-col gap-6 bg-[#f9fafe] px-6 sm:px-8 dark:bg-secondary-light">
                <table className="w-full table-auto border-separate border-spacing-y-6 sm:border-spacing-y-8">
                  <thead className="hidden sm:table-header-group">
                    <tr className="text-sm font-medium text-neutral-400 dark:text-neutral-200">
                      <th className="w-1/2 text-left font-medium" scope="col">
                        Item name
                      </th>
                      <th className="text-center font-medium" scope="col">
                        QTY.
                      </th>
                      <th className="text-right font-medium" scope="col">
                        Price
                      </th>
                      <th className="text-right font-medium" scope="col">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item: any) => (
                      <tr key={item.name}>
                        <th
                          scope="row"
                          className="text-left text-base font-bold leading-none tracking-tight text-black-light dark:text-white"
                        >
                          {item.name}
                          <span className="mt-2 block text-sm font-bold leading-none tracking-tight text-neutral-400 sm:hidden dark:text-neutral-300">
                            {item.quantity} x £ {formatCurrency(item.price)}
                          </span>
                        </th>
                        <td className="hidden text-center text-base font-bold leading-none tracking-tight text-neutral-400 sm:table-cell dark:text-neutral-200">
                          {item.quantity}
                        </td>
                        <td className="hidden text-right text-base font-bold leading-none tracking-tight text-neutral-400 sm:table-cell dark:text-neutral-200">
                          £ {formatCurrency(item.price)}
                        </td>
                        <td className="text-right text-base font-bold leading-none tracking-tight text-black-light dark:text-white">
                          £ {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="transition-theme flex w-full items-center justify-between gap-4 bg-neutral-500 p-6 sm:px-8 dark:bg-black-light">
                <span className="text-sm font-medium text-white">
                  Grand Total
                </span>
                <p className="text-2xl font-bold -tracking-[0.5px] text-white">
                  £ {formatCurrency(invoice.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-[100px] left-0 right-0 z-10 h-4 bg-gradient-to-t from-neutral-100 to-neutral-100/0 sm:bottom-0 dark:from-black dark:to-black/0"></div>
      </div>
    </div>
  );
}
export default Invoice;
