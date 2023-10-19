"use client";

import {JSX, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { magic } from "@/lib/magicClient";
import Loading from "@/components/Loading/Loading";

interface Props {
  child: JSX.Element
}

const LoginRouter = (props: Props) => {
  const { child } = props;
  const router = useRouter();
  const [loading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    };

    const _ = handleLoggedIn();
  }, []);

  return loading ? <Loading /> : child;
};

export default LoginRouter;
