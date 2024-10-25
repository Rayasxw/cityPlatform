import React, {useState, useEffect} from 'react';
import axios from "../../axios";
import ComplaintCard from "../../components/ComplaintCard/ComplaintCard";

function Home({user}) {
    const [complaints, setComplaints] = useState([])

    const getComplaints = async () => {
        try {
            const response = await axios.get('/complaints');
            setComplaints(response.data); // Сохраняем жалобы в состояние
        } catch (error) {
            alert('Ошибка при загрузке жалоб');
        }
    };


    useEffect(() => {
        getComplaints();
    }, []);

    return (
        <main>
            <h2>Жалобы и предложения</h2>
            <div className="complaintList">
                {complaints.length > 0 ? (
                    complaints.map(complaint => (
                        <ComplaintCard key={complaint.id} complaint={complaint}
                                       isAdmin={user?.role === 'admin'}/>
                    ))
                ) : (
                    <p>Здесь пока нет жалоб</p>
                )}
            </div>
        </main>
    );
}

export default Home;