import Link from 'next/link'
import Layout from "@/components/Layout";

export default function HomePage() {
    return (
        <Layout>           
            <main>
                <h1>Home page</h1>
                <Link href={'/about'}>about page</Link>
            </main>
        </Layout>
    );
}
