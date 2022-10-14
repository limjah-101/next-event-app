//import { parseCookies } from "@/helpers/index";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { API_URL } from "config";
import styles from "../../../styles/EventAdd.module.scss";
import Image from "next/image";

export default function EditEventPage({ evt }) {
    const [values, setValues] = useState({
        name: evt.attributes.name,
        performers: evt.attributes.performers,
        venue: evt.attributes.venue,
        address: evt.attributes.address,
        date: evt.attributes.date,
        time: evt.attributes.time,
        description: evt.attributes.description,
    });
    const [showModal, setShowModal] = useState(false);
    const [imgPrev, setImgPrev] = useState(
        evt.attributes.image.data !== null
            ? evt.attributes.image.data.attributes.formats.thumbnail.url
            : null
    );

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(values);

        // Validation
        const hasEmptyFields = Object.values(values).some(
            (element) => element === ""
        );

        if (hasEmptyFields) {
            toast.error("Please fill in all fields");
        }

        const res = await fetch(`${API_URL}/${evt.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                //Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ data: values }),
        });

        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error("No token included");
                return;
            }
            toast.error("Something Went Wrong");
        } else {
            const evt = await res.json();
            const slug = evt.data.attributes.slug;
            router.push(`/events/${slug}`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <Layout title="Add New Event">
            <Link href="/">Go Back</Link>
            <h1>Edit Event</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="performers">Performers</label>
                        <input
                            type="text"
                            name="performers"
                            id="performers"
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="venue">Venue</label>
                        <input
                            type="text"
                            name="venue"
                            id="venue"
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={moment(values.date).format("YYYY-MM-DD")}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input
                            type="text"
                            name="time"
                            id="time"
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description">Event Description</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type="submit" value="Edit Event" className="btn" />
            </form>

            {imgPrev ? (
                <Image src={imgPrev} width={300} height={200} />
            ) : (
                <div>
                    <p>No image uploaded.</p>
                </div>
            )}

            <div>
                <button onClick={() => setShowModal(true)}>Add image</button>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                Image Upload
            </Modal>
        </Layout>
    );
}

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`${API_URL}/${id}?populate=*`);
    const evt = await res.json();
    return {
        props: {
            evt: evt.data,
        },
    };
}
