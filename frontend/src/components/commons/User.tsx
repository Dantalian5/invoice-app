import imgUser from "@/assets/image-avatar.jpg";

function User() {
  return (
    <div className="size-8 overflow-hidden rounded-full">
      <img src={imgUser} alt="Avatar" className="w-full" />
    </div>
  );
}
export default User;
