import { useInvoice } from "@/components/context/InvoiceContext";
import { svgArrowLeft } from "@/components/svg/SvgIcons";
import Button from "@/components/commons/Button";
import Input from "@/components/form/Input";
import { z } from "zod";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const formSchema = z.object({
  clientName: z.string().min(1, "can't be empty"),
  clientEmail: z.string().email("invalid email address"),
  createdAt: z.string().date("invalid date"),
  paymentTerms: z.number().int().min(1, "can't be empty"),
  description: z.string().min(1, "can't be empty"),
  senderAddress: z.object({
    street: z.string().min(1, "can't be empty"),
    city: z.string().min(1, "can't be empty"),
    postCode: z.string().min(1, "can't be empty"),
    country: z.string().min(1, "can't be empty"),
  }),
  clientAddress: z.object({
    street: z.string().min(1, "can't be empty"),
    city: z.string().min(1, "can't be empty"),
    postCode: z.string().min(1, "can't be empty"),
    country: z.string().min(1, "can't be empty"),
  }),
  items: z.array(
    z.object({
      name: z.string().min(1, "can't be empty"),
      quantity: z.number().int().min(1, "can't be empty"),
      price: z.number().min(1, "can't be empty"),
      total: z.number().min(1, "can't be empty"),
    }),
  ),
});
type FormSchema = z.infer<typeof formSchema>;

const InvoiceForm = () => {
  const { formState, closeForm } = useInvoice();
  const { mode, invoiceData } = formState;

  const defaultValues =
    mode === "edit"
      ? invoiceData
      : {
          clientName: "",
          clientEmail: "",
          createdAt: "",
          paymentTerms: 0,
          description: "",
          senderAddress: {
            street: "",
            city: "",
            postCode: "",
            country: "",
          },
          clientAddress: {
            street: "",
            city: "",
            postCode: "",
            country: "",
          },
          items: [],
        };

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => console.log(data);

  useEffect(() => {
    reset(defaultValues);
  }, [invoiceData, mode]);

  const onCloseForm = () => {
    reset();
    closeForm();
  };

  return (
    <div
      className={`absolute inset-0 z-50 transform overflow-hidden bg-white shadow-lg transition-transform duration-300 ${
        formState.isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="transition-theme absolute left-0 top-0 flex size-full flex-col overflow-hidden bg-white dark:bg-black">
        <div className="z-10 w-full px-6 pb-4 pt-8">
          <button
            className="flex items-center gap-6 text-base font-bold leading-none tracking-tight text-black-light dark:text-white"
            onClick={onCloseForm}
          >
            <span className="mb-1">{svgArrowLeft}</span>Go back
          </button>
        </div>
        <div className="z-0 w-full flex-grow overflow-hidden">
          <form
            className="z-0 size-full overflow-scroll px-6 pb-16 pt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="mb-6 text-2xl font-bold -tracking-[0.5px] text-black-light dark:text-white">
              {mode === "create" ? (
                "New Invoice"
              ) : (
                <>
                  Edit{" "}
                  <span className="text-neutral-300 dark:text-neutral-300">
                    #
                  </span>
                  {invoiceData.id}
                </>
              )}
            </p>
            <div className="mb-10 flex w-full flex-wrap gap-6">
              <span className="w-full text-sm font-bold leading-none tracking-tight text-primary">
                Bill From
              </span>
              <Input
                className="w-full"
                label="Street Address"
                {...register("senderAddress.street")}
                isError={!!errors.senderAddress?.street}
                errorMessage={errors.senderAddress?.street?.message}
              />
              <Input
                className="flex-1"
                label="City"
                {...register("senderAddress.city")}
                isError={!!errors.senderAddress?.city}
                errorMessage={errors.senderAddress?.city?.message}
              />
              <Input
                className="flex-1"
                label="Post Code"
                {...register("senderAddress.postCode")}
                isError={!!errors.senderAddress?.postCode}
                errorMessage={errors.senderAddress?.postCode?.message}
              />
              <Input
                className="w-full"
                label="Country"
                {...register("senderAddress.country")}
                isError={!!errors.senderAddress?.country}
                errorMessage={errors.senderAddress?.country?.message}
              />
            </div>
            <div className="mb-10 flex w-full flex-wrap gap-6">
              <span className="w-full text-sm font-bold leading-none tracking-tight text-primary">
                Bill To
              </span>
              <Input
                className="w-full"
                label="Client's Name"
                {...register("clientName")}
                isError={!!errors.clientName}
                errorMessage={errors.clientName?.message}
              />
              <Input
                className="w-full"
                label="Client's Email"
                {...register("clientEmail")}
                isError={!!errors.clientEmail}
                errorMessage={errors.clientEmail?.message}
              />
              <Input
                className="w-full"
                label="Street Address"
                {...register("clientAddress.street")}
                isError={!!errors.clientAddress?.street}
                errorMessage={errors.clientAddress?.street?.message}
              />
              <Input
                className="flex-1"
                label="City"
                {...register("clientAddress.city")}
                isError={!!errors.clientAddress?.city}
                errorMessage={errors.clientAddress?.city?.message}
              />
              <Input
                className="flex-1"
                label="Post Code"
                {...register("clientAddress.postCode")}
                isError={!!errors.clientAddress?.postCode}
                errorMessage={errors.clientAddress?.postCode?.message}
              />
              <Input
                className="w-full"
                label="Country"
                {...register("clientAddress.country")}
                isError={!!errors.clientAddress?.country}
                errorMessage={errors.clientAddress?.country?.message}
              />
            </div>
            <div className="mb-16 flex w-full flex-wrap gap-6">
              <Input
                className="w-full"
                label="Invoice Date"
                {...register("createdAt")}
                isError={!!errors.createdAt}
                errorMessage={errors.createdAt?.message}
              />
              <Input
                className="w-full"
                label="Payment Terms"
                {...register("paymentTerms", { valueAsNumber: true })}
                isError={!!errors.paymentTerms}
                errorMessage={errors.paymentTerms?.message}
              />
              <Input
                className="w-full"
                label="Project Description"
                {...register("description")}
                isError={!!errors.description}
                errorMessage={errors.description?.message}
              />
            </div>
          </form>
        </div>
        <div className="z-10 flex w-full flex-wrap items-center justify-between gap-1.5 px-6 py-5">
          <Button variant="secondary" size="sm">
            Discard
          </Button>
          <Button variant="dark" size="sm">
            Save as Draft
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-grow"
            onClick={handleSubmit(onSubmit)}
          >
            Save & Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
