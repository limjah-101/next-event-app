import Link from 'next/link'
import Layout from "@/components/Layout";
import { API_URL } from 'config';
import EventItem from '@/components/EventItem';

export default function HomePage({events}) {
    return (
        <Layout>           
            <main>
                {events.data.map((evt, i) => {
                    return(
                        <EventItem key={i} evt={evt}/>
                    )
                })}
            </main>
        </Layout>
    );
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/events?populate=*`)
    const events = await res.json()
   
    return {
        props: { events },
        revalidate: 1
    }
}
