import React, { useState } from 'react';
import axios from "../../axios";
import styles from'../../scss/AddComplaintModal.module.css'; // Импортируем стили

function AddComplaintModal({ setAddComplaintOpen }) {
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');
    const [region, setRegion] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.post('/complaints', { photo, description, region });
            setAddComplaintOpen(false);
            alert('Жалоба успешно добавлена');
        } catch (error) {
            alert('Ошибка при добавлении жалобы');
        }
    };

    return (
        <div className={styles.boxModal}>
            <h2 className={styles.h2}>Добавить жалобу</h2>
            <input className={styles.input}
                type="text"
                placeholder="Фото URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
            />
            <input className={styles.input}
                type="text"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input className={styles.input}
                type="text"
                placeholder="Район"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
            />
            <button className={styles.button} onClick={handleSubmit}>Опубликовать</button>
            <button className={styles.button} onClick={() => setAddComplaintOpen(false)}>Отмена</button>
        </div>
    );
}

export default AddComplaintModal;
