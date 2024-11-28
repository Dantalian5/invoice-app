import { useInvoice } from "@/components/context/InvoiceContext";

const InvoiceForm = () => {
  const { formState, closeForm } = useInvoice();

  return (
    <div
      className={`fixed right-0 top-0 z-50 h-full w-96 transform bg-white shadow-lg transition-transform duration-300 ${
        formState.isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-bold">
          {formState.mode === "create" ? "Create Invoice" : "Edit Invoice"}
        </h2>
        <button
          onClick={closeForm}
          className="text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>
      </div>
      <div className="p-4">
        {formState.mode === "edit" && (
          <p>Editing Invoice ID: {formState.invoiceData.id}</p>
        )}
        {/* Aquí va el formulario */}
        <form>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold">Title</label>
            <input
              type="text"
              className="w-full rounded border p-2"
              placeholder="Invoice Title"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold">Amount</label>
            <input
              type="number"
              className="w-full rounded border p-2"
              placeholder="Amount"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 w-full rounded p-2 text-white"
          >
            {formState.mode === "create" ? "Create" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
