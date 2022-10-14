import Link from "next/link";
import Layout from "@/components/Layout";

export default function NotFoundPage() {
    return (
        <Layout>
            <h2>Page Not found</h2>
            <Link href="/">Back to home</Link>
        </Layout>
    );
}
