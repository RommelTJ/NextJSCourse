"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./login.module.css";
import {ChangeEvent, useState} from "react";
import { useRouter } from "next/navigation";
import { magic } from "@/lib/magicClient";
import {InstanceWithExtensions, SDKBase} from "@magic-sdk/provider";
import {MagicSDKExtensionsOption} from "magic-sdk";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async () => {
    setIsLoading(true);
    if (email === "rommeltj@gmail.com") {
      //  log in a user by their email
      try {
        if (magic !== false) {
          const magicInstance: InstanceWithExtensions<SDKBase, MagicSDKExtensionsOption<string>> = magic
          const didToken = await magicInstance.auth.loginWithMagicLink({
            email,
          });
          if (didToken) {
            setIsLoading(false);
            router.push("/");
          }
        } else {
          setIsLoading(false);
          console.error("Magic instance not set up");
        }
      } catch (error) {
        // Handle errors if required!
        setIsLoading(false);
        console.error("Something went wrong logging in", error);
      }
    } else {
      // show user message
      setIsLoading(false);
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
