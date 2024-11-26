import useTheme from "@/stores/theme.store";
import { svgSun, svgMoon } from "@/components/svg/SvgIcons";

function ThemeSwitch() {
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);
  return (
    <button
      onClick={toggleTheme}
      className="relative size-7 overflow-hidden p-1 text-xl"
    >
      <span
        className={`absolute left-0 block p-1 transition-all duration-500 ${theme === "light" ? "bottom-0" : "bottom-full"}`}
      >
        {svgSun}
      </span>
      <span
        className={`absolute left-0 block p-1 transition-all duration-500 ${theme === "dark" ? "top-0" : "top-full"}`}
      >
        {svgMoon}
      </span>
    </button>
  );
}
export default ThemeSwitch;
