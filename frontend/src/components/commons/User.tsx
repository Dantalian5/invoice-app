import imgUser from "@/assets/image-avatar.jpg";
import { useAuth } from "@/components/context/AuthContext";

function User() {
  const { logout } = useAuth();

  return (
    <button className="size-8 overflow-hidden rounded-full" onClick={logout}>
      <img src={imgUser} alt="Avatar" className="w-full" />
    </button>
  );
}
export default User;
