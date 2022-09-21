import React from "react";
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
    return (
        <footer className={styles.Footer}>
            <div className="container">
                <p>&copy; 2022 Wild Code School</p>
            </div>
        </footer>
    );
};

export default Footer;
