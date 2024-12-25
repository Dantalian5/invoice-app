import { createContext, useContext, useState, ReactNode } from "react";

interface InvoiceFormState {
  isOpen: boolean;
  mode: "create" | "edit";
  invoiceData?: any;
}

interface InvoiceContextType {
  formState: InvoiceFormState;
  openForm: (mode: "create" | "edit", invoiceData?: any) => void;
  closeForm: () => void;
}

interface InvoiceProviderProps {
  children: ReactNode;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: InvoiceProviderProps) {
  const [formState, setFormState] = useState<InvoiceFormState>({
    isOpen: false,
    mode: "create",
  });

  const openForm = (mode: "create" | "edit", invoiceData?: any) => {
    setFormState({
      isOpen: true,
      mode,
      invoiceData,
    });
  };

  const closeForm = () => {
    setFormState({
      isOpen: false,
      mode: "create",
    });
  };

  return (
    <InvoiceContext.Provider value={{ formState, openForm, closeForm }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within a InvoiceProvider");
  }
  return context;
}
