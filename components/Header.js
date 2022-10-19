import { useContext } from "react";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import styles from "../styles/Header.module.scss";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className={styles.nav}>
            <div className={styles.nav_center}>
                <div className={styles.nav_center__logo}>
                    <Link href="/">NE</Link>
                </div>
                <ul className={styles.nav_center__links}>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    {user ? (
                        // if authenticated
                        <>
                            <li>
                                <Link href="/account/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link href="/events/add">Add event</Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => logout()}
                                    className="btn-secondary btn-icon"
                                >
                                    <FaSignOutAlt /> Sign out
                                </button>
                            </li>
                        </>
                    ) : (
                        // Not authenticated
                        <>
                            <li>
                                <Link href="/account/login">Sign In</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
