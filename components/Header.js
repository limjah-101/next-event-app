import Link from "next/link";
import styles from "../styles/Header.module.scss";

export default function Header() {
    return (
        <nav className={styles.nav}>
            <div className={styles.nav_center}>
                <div className={styles.nav_center__logo}>
                    <Link href="/">NE</Link>
                </div>
                <ul className={styles.nav_center__links}>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/events/add">Add event</Link></li>
                    <li><Link href="/about">Sign In</Link></li>
                </ul>
            </div>
        </nav>
    );
}
