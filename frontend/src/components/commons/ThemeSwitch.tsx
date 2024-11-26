import useTheme from "@/stores/theme.store";
import { svgSun, svgMoon } from "@/components/svg/SvgIcons";

function ThemeSwitch() {
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);
  return (
    <button onClick={toggleTheme} className="p-1 text-xl">
      {theme === "light" ? svgMoon : svgSun}
    </button>
  );
}
export default ThemeSwitch;
