import React from "react";
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import styles from "./Header.module.css";

const Header: React.FC = () => {
    return (
        <header className={styles.Header}>
            <div className="container">
                <h1>Wilders Book</h1>
            </div>
        </header>
    );
};

export default Header;
