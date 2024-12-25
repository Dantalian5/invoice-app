import { useInvoice } from "@/components/context/InvoiceContext";
import { svgArrowLeft, svgDelete } from "@/components/svg/SvgIcons";
import Button from "@/components/commons/Button";
import Input from "@/components/form/Input";
import DatePicker from "@/components/form/DatePicker";
import TermPicker from "@/components/form/TermPicker";
import {
  useForm,
  type SubmitHandler,
  useFieldArray,
  useWatch,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { parseStringToDate } from "@/lib/dateFns";
import { formatCurrency } from "@/lib/helpers";
import { formSchema, type FormSchema } from "@/schemas/invoices/form.schema";

const InvoiceForm = () => {
  const { formState, closeForm } = useInvoice();
  const { mode, invoiceData } = formState;

  const defaultValues =
    mode === "edit"
      ? { ...invoiceData, createdAt: parseStringToDate(invoiceData.createdAt) }
      : {
          clientName: "",
          clientEmail: "",
          createdAt: new Date(),
          paymentTerms: 1,
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
  const items = useWatch({
    control,
    name: "items",
    defaultValue: [],
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => console.log(data);

  useEffect(() => {
    reset(defaultValues);
  }, [invoiceData, mode]);

  const onCloseForm = () => {
    reset(defaultValues);
    closeForm();
  };

  return (
    <div
      className={`group absolute inset-0 z-50 transform overflow-hidden transition-transform duration-300 ${
        formState.isOpen ? "is-active translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        onClick={onCloseForm}
        className={`absolute inset-0 z-0 bg-[#000] opacity-0 transition-opacity group-[.is-active]:opacity-50 group-[.is-active]:delay-200`}
      ></div>
      <div className="transition-theme absolute left-0 top-0 z-10 flex size-full max-w-[37.5rem] sm:rounded-r-2xl flex-col overflow-hidden bg-white dark:bg-black">
        <div className="relative z-10 w-full px-6 pb-4 pt-8">
          <button
            className="flex items-center gap-6 text-base font-bold leading-none tracking-tight text-black-light dark:text-white"
            onClick={onCloseForm}
          >
            <span className="mb-1">{svgArrowLeft}</span>Go back
          </button>
        </div>
        <div className="relative z-0 w-full flex-grow overflow-hidden">
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-4 bg-gradient-to-b from-white to-neutral-100/0 dark:from-black dark:to-black/0"></div>
          <form
            className="z-0 size-full overflow-scroll px-6 pb-20 pt-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
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
                type="email"
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
            <div className="relative z-0 mb-16 flex w-full flex-wrap gap-6">
              <Controller
                name="createdAt"
                control={control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    label="Issue Date"
                    isError={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    className="w-full"
                    inactive={mode === "edit"}
                  />
                )}
              />
              <Controller
                name="paymentTerms"
                control={control}
                render={({ field, fieldState }) => (
                  <TermPicker
                    value={field.value}
                    onChange={field.onChange}
                    label="Payment Term"
                    isError={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    className="w-full"
                  />
                )}
              />
              <Input
                className="w-full"
                label="Project Description"
                {...register("description")}
                isError={!!errors.description}
                errorMessage={errors.description?.message}
              />
            </div>
            <div className="">
              <span className="mb-6 block text-lg font-bold tracking-tight text-[#777f98]">
                Item List
              </span>
              <div className="flex flex-col gap-12">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-wrap items-center gap-x-4 gap-y-6"
                  >
                    <Input
                      className="w-full"
                      label="Item Name"
                      {...register(`items.${index}.name` as const)}
                      isError={!!errors.items?.[index]?.name}
                      errorMessage={errors.items?.[index]?.name?.message}
                    />
                    <Input
                      className="flex-[1_1_44px]"
                      label="Qty."
                      {...register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      isError={!!errors.items?.[index]?.quantity}
                    />
                    <Input
                      className="flex-[1_1_80px]"
                      label="Price"
                      {...register(`items.${index}.price`, {
                        valueAsNumber: true,
                      })}
                      isError={!!errors.items?.[index]?.price}
                    />
                    <div className="flex-[1_1_65px] text-sm font-medium tracking-normal text-neutral-400">
                      <span className="block w-full">Total</span>
                      <span className="mt-2 block w-full py-4 text-base font-bold">
                        {formatCurrency(
                          Number(items[index]?.price) *
                            Number(items[index]?.quantity) || 0,
                        )}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="mb-5 mr-4 w-fit self-end text-neutral-300 hover:text-danger"
                      onClick={() => remove(index)}
                      aria-label="Remove item"
                    >
                      {svgDelete}
                    </button>
                  </div>
                ))}
                <Button
                  variant="secondary"
                  onClick={() => append({ name: "", quantity: 1, price: 1 })}
                  size="lg"
                  type="button"
                >
                  + Add New Item
                </Button>
              </div>
            </div>

            {Object.entries(errors).length > 0 && (
              <div className="mt-6 w-full text-xs font-semibold leading-normal text-danger">
                <span className="block">- All fields must be added</span>
                {errors.items && (
                  <span className="block">- An item must be added</span>
                )}
              </div>
            )}
          </form>
        </div>
        <div className="relative z-10 flex w-full flex-wrap items-center justify-end gap-2 px-6 py-5 before:pointer-events-none before:absolute before:bottom-full before:left-0 before:right-0 before:z-10 before:h-16 before:bg-shadowDown before:content-['']">
          <Button
            variant="secondary"
            size={mode === "create" ? "sm" : "md"}
            className={mode === "create" ? "mr-auto" : "ml-auto"}
            onClick={onCloseForm}
          >
            {mode === "create" ? "Discard" : "Cancel"}
          </Button>
          {mode === "create" && (
            <Button variant="dark" size="sm">
              Save as Draft
            </Button>
          )}
          <Button
            variant="primary"
            size={mode === "create" ? "sm" : "md"}
            // className={`${mode === "create" && "flex-grow"}`}
            onClick={handleSubmit(onSubmit)}
          >
            {mode === "create" ? "Save & Send" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
