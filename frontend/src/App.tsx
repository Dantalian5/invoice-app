import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/components/layout/Dashboard";
import useTheme from "@/stores/theme.store";

function App() {
  const theme = useTheme((state) => state.theme);
  return (
    <div className={`w-full ${theme} flex h-screen flex-col`}>
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
