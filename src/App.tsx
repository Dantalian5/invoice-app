import Navbar from "@/components/layout/Navbar";
import Viewer from "@/components/layout/Viewer";
import useTheme from "@/stores/theme.store";

function App() {
  const theme = useTheme((state) => state.theme);
  return (
    <div className={`w-full ${theme} flex h-screen flex-col`}>
      <Navbar />
      <Viewer />
    </div>
  );
}

export default App;
