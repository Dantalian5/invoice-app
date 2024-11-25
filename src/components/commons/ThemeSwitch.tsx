import useTheme from "@/stores/theme.store";
import SvgMoon from "@/components/svg/SvgMoon";
import SvgSun from "@/components/svg/SvgSun";

function ThemeSwitch() {
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);
  return (
    <button onClick={toggleTheme} className="p-1 text-xl">
      {theme === "light" ? <SvgMoon /> : <SvgSun />}
    </button>
  );
}
export default ThemeSwitch;
