import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/AuthForm.module.scss";
import { FaUser } from "react-icons/fa";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const { login, error } = useContext(AuthContext);

    //useEffect(() => error && toast.error(error));

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, pwd });
    };

    return (
        <Layout title="User Login">
            <div className={styles.auth}>
                <h1>
                    <FaUser /> Sign In
                </h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="pwd">Password</label>
                        <input
                            type="password"
                            id="pwd"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>

                    <input type="submit" value="Login" className="btn" />
                </form>

                <p>
                    Don't have an account?{" "}
                    <Link href="/account/register">Register</Link>
                </p>
            </div>
        </Layout>
    );
}
