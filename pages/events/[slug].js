import {useRouter} from 'next/router'
import Layout from '@/components/Layout';

export default function EventPage() {
    const router = useRouter();
    
    return (
        <Layout title="Event Detail | NE">
            <h1>Event Detail page.</h1>
        </Layout>
    )
}
