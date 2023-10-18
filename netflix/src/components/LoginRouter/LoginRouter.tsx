"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { magic } from "@/lib/magicClient";

const LoginRouter = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLoggedIn = async () => {
      //@ts-ignore
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        // route to /
        router.push("/");
      } else {
        // route to /login
        router.push("/login");
      }
    };

    const _ = handleLoggedIn();
  }, []);

  return null;
};

export default LoginRouter;
