import styles from "../styles/Modal.module.scss";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ show, onClose, children, title }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    });

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href="#" onClick={handleClose}>
                        close
                    </a>
                </div>
                {title && <div></div>}
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
}
