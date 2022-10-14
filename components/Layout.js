import Head from "next/head";
import styles from '../styles/Layout.module.scss';
import Header from "./Header";

export default function Layout({ title, keywords, description, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <Header />
            <div className={styles.container}>                
                { children }
            </div>
        </div>
    )
}

Layout.defaultProps = {
    title: 'Home | NEvent',
    description: 'Learning Next js',
    keywords: 'Next JS, React, GraphQL, Redux'
}
