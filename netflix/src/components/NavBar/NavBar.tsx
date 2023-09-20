"use client";

import styles from "./NavBar.module.css";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  username: string;
}

const NavBar = (props: Props) => {
  const { username } = props;
  const router = useRouter();

  const handleOnClickHome = () => router.push("/");

  const handleOnClickMyList = () => router.push("/browse/my-list");

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>Netflix</div>
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
            <button className={styles.usernameBtn}>
              <p className={styles.username}>{username}</p>
            </button>

            <div className={styles.navDropdown}>
              <div>
                <Link href="/login" legacyBehavior>
                  <a className={styles.linkName}>Sign out</a>
                </Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
