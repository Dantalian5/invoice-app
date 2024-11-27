import Navbar from "@/components/layout/Navbar";
import useTheme from "@/stores/theme.store";
import { Navigate, Outlet } from "@tanstack/react-router";

function App() {
  const theme = useTheme((state) => state.theme);
  return (
    <div
      className={`w-full ${theme} transition-theme flex h-screen min-w-80 flex-col bg-neutral-100 dark:bg-black`}
    >
      <Navbar />
      <Navigate to="/dashboard" />
      <Outlet />
    </div>
  );
}

export default App;
