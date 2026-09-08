import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
  ];

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
          <Button
            variant={`outline`}
            render={<Link href={`/login`}>Login</Link>}
            nativeButton={false}
          >
            login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
