"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";

const Header = () => {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
  ];

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Tata",
          description: "Logged out seccessfully.",
          type: "success",
        });

        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: () => {
        toast.add({
          title: "Logout Failed",
          description: "Something Went Wrong!",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div className="">PH Healthcare</div>
        <nav className="flex items-center gap-3">
          {routes.map((route) => (
            <Link href={route.url} key={route.url}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div className="">
          {!isLoading && !data && (
            <Button
              variant={`outline`}
              render={<Link href={`/login`}>Login</Link>}
              nativeButton={false}
            >
              login
            </Button>
          )}
          {!isLoading && data && (
            <Button onClick={() => handleLogout()} variant={`destructive`}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
