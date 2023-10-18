"use client";

import styles from "./NavBar.module.css";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { magic } from "@/lib/magicClient";


const NavBar = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function getUsername() {
      try {
        // @ts-ignore
        const { email } = await magic.user.getMetadata();
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.log("Error retrieving email:", error);
      }
    }
    const _ = getUsername();
  }, []);

  const handleOnClickHome = () => router.push("/");

  const handleOnClickMyList = () => router.push("/browse/my-list");

  const handleShowDropdown = () => setShowDropdown(!showDropdown);

  const handleSignOut = async () => {
    try {
      // @ts-ignore
      await magic.user.logout();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width={128}
              height={34}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="Expand more"
                width={24}
                height={24}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a onClick={handleSignOut} className={styles.linkName}>Sign out</a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
