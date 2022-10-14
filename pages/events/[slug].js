import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "config";
import styles from "../../styles/EventCard.module.scss";
export default function EventPage({ evt }) {
    const router = useRouter();

    const deleteEvent = async (e) => {
        e.preventDefault();
        console.log(evt);
        if (confirm("Are you sure?")) {
            const res = await fetch(`${API_URL}/${evt.id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
            } else {
                router.push("/");
            }
        }
    };
    return (
        <Layout title="Event Detail | NE">
            <h1>{evt.attributes.name}</h1>
            <ToastContainer />
            <div className={styles.card}>
                <div className={styles.card__img}>
                    <Image
                        src={
                            evt.attributes.image.data !== null
                                ? evt.attributes.image.data.attributes.formats
                                      .thumbnail.url
                                : "/assets/images/event-default.png"
                        }
                        width={300}
                        height={200}
                    />
                </div>

                <div className={styles.card__body}>
                    <span>
                        {new Date(evt.attributes.date).toLocaleDateString(
                            "en-US"
                        )}{" "}
                        at {evt.attributes.time}
                    </span>
                </div>
            </div>

            <div>
                <button onClick={deleteEvent}>delete</button>
                <Link href={`/events/edit/${evt.id}`}>edit</Link>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(`${API_URL}?filters[slug][$eq]=${slug}&populate=*`);
    const event = await res.json();
    console.log(event);
    return {
        props: {
            evt: event.data[0],
        },
    };
}
