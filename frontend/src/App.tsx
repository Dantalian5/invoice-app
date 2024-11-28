import Navbar from "@/components/layout/Navbar";
import useTheme from "@/stores/theme.store";
import { Outlet } from "@tanstack/react-router";
import InvoiceForm from "@/components/form/InvoiceForm";
import { InvoiceProvider } from "@/components/context/InvoiceContext";

function App() {
  const theme = useTheme((state) => state.theme);
  return (
    <InvoiceProvider>
      <div
        className={`w-full ${theme} transition-theme flex h-screen min-w-80 flex-col overflow-hidden bg-neutral-100 lg:flex-row dark:bg-black`}
      >
        <Navbar />
        <main className="relative w-full flex-grow overflow-hidden">
          <InvoiceForm />
          <div className="mx-auto size-full max-w-[50.625rem] overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </InvoiceProvider>
  );
}

export default App;
