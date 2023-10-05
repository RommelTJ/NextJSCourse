import Image from "next/image";
import Link from "next/link";
import styles from "./login.module.css";

const Login = () => {
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
    </div>
  );
};

export default Login;
