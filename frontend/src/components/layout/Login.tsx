import Input from "@/components/form/Input";
import Button from "@/components/commons/Button";
import { Link, useNavigate, getRouteApi } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/schemas/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/components/context/AuthContext";
import { useEffect } from "react";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const params = getRouteApi("/login").useSearch() as { redirect?: string };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@example.com",
      password: "password",
    },
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const { email, password } = data;
    const isLogin = await login(email, password);
    if (!isLogin) {
      alert("Invalid email or password");
    } 
  };

  useEffect(() => {
    navigate({ to: params.redirect || "/", replace: true });
  }, [isAuthenticated]);

  return (
    <div className="relative flex size-full flex-col items-center justify-center overflow-hidden p-6">
      <form
        className="flex w-full max-w-[350px] flex-col gap-6 overflow-scroll"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          className="w-full"
          label="Email"
          {...register("email")}
          isError={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          className="w-full"
          label="Password"
          {...register("password")}
          isError={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <span className="text-sm text-neutral-400 dark:text-neutral-300">
          Don't have an account?{" "}
          <Link className="text-primary" href="/signin">
            Sign In
          </Link>
        </span>
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
export default Login;
