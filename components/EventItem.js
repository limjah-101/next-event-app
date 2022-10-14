import Image from "next/image";
import Link from "next/link";
import styles from "../styles/EventCard.module.scss";

export default function EventItem({ evt }) {
    return (
        <div className={styles.card}>
            <div className={styles.card__img}>
                <Image
                    width={300}
                    height={200}
                    src={
                        evt.attributes.image.data !== null
                            ? evt.attributes.image.data.attributes.formats
                                  .thumbnail.url
                            : "/assets/images/event-default.png"
                    }                   
                />
            </div>

            <div className={styles.card__body}>
                <span>
                    {new Date(evt.attributes.date).toLocaleDateString("en-US")}{" "}
                    at {evt.attributes.time}
                </span>
                <h3>{evt.attributes.name}</h3>
                <div className={styles.link}>
                    <Link href={`/events/${evt.attributes.slug}`}>
                        <a className="btn">Details</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
