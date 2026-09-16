import { LoaderIcon } from "lucide-react";
import React from "react";

const AuthLoading = ({ label = "Verifying account" }: { label?: string }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-3 items-center">
        <LoaderIcon className="size-6 animate-spin" />
        {label}
      </div>
    </div>
  );
};

export default AuthLoading;
