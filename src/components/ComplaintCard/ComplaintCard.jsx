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
                await axios.patch(`/complaints/${complaint.id}`, { supportCount: complaint.supportCount + 1 });
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
            <img src={complaint.photo} alt="Complaint" />
            <h3>{complaint.region}</h3>
            <p>{complaint.description}</p>
            <p>Поддержки: {supportCount}</p>
            <button onClick={handleSupport} disabled={supported}>
                {supported ? "Поддержано" : "Поддержать"}
            </button>
            {isAdmin && (
                <div className="admin-buttons">
                    <button onClick={handleAccept} style={{ backgroundColor: 'green' }}>Принять</button>
                    <button onClick={handleReject} style={{ backgroundColor: 'red' }}>Отклонить</button>
                </div>
            )}
        </div>
    );
}

export default ComplaintCard;
