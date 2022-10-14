import React, { useState } from "react";
import { API_URL } from "config";
import styles from "../styles/EventAdd.module.scss";

export default function ImageUpload({ evtId, imageUploaded }) {
    const [img, setImg] = useState(null);

    const handleFileChange = (e) => {
        //console.log(e.target.files[0]);
        setImg(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("files", img);
        formData.append("ref", "api::event.event");
        formData.append("refId", evtId);
        formData.append("field", "image");

        const res = await fetch(`http://localhost:1337/api/upload`, {
            method: "POST",
            body: formData,
            // token will be heere
        });

        if (res.ok) {
            imageUploaded();
        }
    };
    return (
        <div className={styles.form}>
            <h2>Upload image</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <input type="submit" value="Upload image" />
            </form>
        </div>
    );
}
