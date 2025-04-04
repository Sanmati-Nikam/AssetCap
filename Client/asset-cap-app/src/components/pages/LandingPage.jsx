import React from "react";
import styles from "./Landing.module.css";

const LandingPage = () => {
    return (
        <div>
            <div>
                <p className={styles.headline1}>Track your assets easily - Stocks, Crypto, Gold,  NFTs,</p>
                <p className={styles.headline2}> all your valuables with AssetCap</p>
            </div>

            <div>
                <p className={styles.subheadline}>All your assets in one place</p>
            </div>

            <div className={styles.subheadlineCardContanier}>
                <div className={styles.subheadlineCard}>
                    <p className={styles.subheadlineCard1Img}>
                    </p>
                    <p className={styles.subheadlineCard1}>
                        <p className={styles.subheadlineCard1Text}>Track all your stocks</p>
                    </p>
                </div>

                <div className={styles.subheadlineCard}>
                    <p className={styles.subheadlineCard2Img}></p>
                    <p className={styles.subheadlineCard1}>
                        <p className={styles.subheadlineCard1Text}>Monitor your crypto holdings</p>
                    </p>
                </div>

                <div className={styles.subheadlineCard}>
                    <p className={styles.subheadlineCard3Img}></p>
                    <p className={styles.subheadlineCard1}>
                        <p className={styles.subheadlineCard1Text}>Maintain visibility of gold
                        </p>
                        <p className={styles.subheadlineCard3Text}>assets</p>
                    </p>
                </div>
           
            </div>
        </div>
    )
};

export default LandingPage