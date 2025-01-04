import { useAuth } from "@/components/context/AuthContext";
import { svgUser, svgLogin } from "@/components/svg/SvgIcons";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "@tanstack/react-router";

function User() {
  const { logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated]);
  return (
    <div className="relative z-10 size-8">
      <button
        className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden rounded-full bg-primary-light text-2xl text-secondary"
        onClick={() => {
          setIsMenuOpen((prev) => !prev);
        }}
      >
        {isAuthenticated ? svgUser : svgLogin}
      </button>
      {isMenuOpen && (
        <ul className="absolute right-0 top-full z-50 flex min-w-40 translate-y-4 flex-col gap-4 rounded-lg bg-black-light p-6 text-neutral-200 shadow-md">
          {isAuthenticated ? (
            <>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={() => console.log("")}>Settings</button>
              </li>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
export default User;
