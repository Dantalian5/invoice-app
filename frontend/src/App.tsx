import Navbar from "@/components/layout/Navbar";
import useTheme from "@/stores/theme.store";
import { Outlet } from "@tanstack/react-router";

function App() {
  const theme = useTheme((state) => state.theme);
  return (
    <div
      className={`w-full ${theme} transition-theme flex h-screen min-w-80 flex-col bg-neutral-100 lg:flex-row dark:bg-black`}
    >
      <Navbar />
      <main className="mx-auto w-full max-w-[50.625rem] flex-grow overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
