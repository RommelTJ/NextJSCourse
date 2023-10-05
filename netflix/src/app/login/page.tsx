"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./login.module.css";

const Login = () => {
  const handleLoginWithEmail = async () => {
    console.log("TODO: handleLoginWithEmail");
  };

  return (
    <div>
      <header>
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
          />

          <p className={styles.userMsg}></p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
