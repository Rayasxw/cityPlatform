import React, { useState } from 'react';
import axios from "../../axios";
import styles from '../../scss/ComplaintCard.module.css'

function ComplaintCard({ complaint , isAdmin}) {
    const [supported, setSupported] = useState(false);
    const [supportCount, setSupportCount] = useState(complaint.supports || 0);
    const [status, setStatus] = useState(complaint.status);


    const handleSupport = async () => {
        if (!supported) {
            try {

                await axios.patch(`/complaints/${complaint.id}`, { supportCount: supportCount + 1 });
                setSupportCount(supportCount + 1);
                setSupported(true);
            } catch (error) {
                alert('Ошибка при поддержке жалобы');
            }
        }
    };
    const handleAccept = async () => {
        try {
            await axios.patch(`/complaints/${complaint.id}`, { status: 'accepted' });
            setStatus('accepted');
        } catch (error) {
            alert('Ошибка при изменении статуса жалобы');
        }
    };


    const handleReject = async () => {
        try {
            await axios.patch(`/complaints/${complaint.id}`, { status: 'rejected' });
            setStatus('rejected');
        } catch (error) {
            alert('Ошибка при изменении статуса жалобы');
        }
    };

    return (
        <div className={`${styles.complaintCard} ${status}`}>
            <img className={styles.img} src={complaint.photo} alt="Complaint" />
            <h3 className={styles.h3}>{complaint.region}</h3>
            <p className={styles.p}>{complaint.description}</p>
            <p className={styles.p}>Поддержки: {complaint.supportCount}</p>
            <button className={styles.button} onClick={handleSupport} disabled={supported}>
                {supported ? "Поддержано" : "Поддержать"}
            </button>
            {isAdmin && (
                <div className={styles.adminButtons}>
                    <button onClick={handleAccept} style={{ backgroundColor: 'green' }}>Принять</button>
                    <button onClick={handleReject} style={{ backgroundColor: 'red' }}>Отклонить</button>
                </div>
            )}
        </div>
    );
}

export default ComplaintCard;
