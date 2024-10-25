import React, { useState, useEffect } from 'react';
import axios from "../../axios";
import ComplaintCard from "../../components/ComplaintCard/ComplaintCard";

function MyAccount({ user }) {
    const [myComplaints, setMyComplaints] = useState([]);


    const getMyComplaints = async () => {
        try {
            const response = await axios.get(`/complaints?userId=${user.id}`);
            setMyComplaints(response.data);
        } catch (error) {
            alert('Ошибка при загрузке личных жалоб');
        }
    };

    useEffect(() => {
        getMyComplaints();
    }, []);

    return (
        <div>
            <h2>Мои жалобы</h2>
            <div className="myComplaintsList">
                {myComplaints.map(complaint => (
                    <ComplaintCard key={complaint.id} complaint={complaint} />
                ))}
            </div>
        </div>
    );
}

export default MyAccount;
