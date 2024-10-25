import React, {useState} from 'react';
import {Link} from "react-router-dom";
import styles from '../../scss/header.module.css'
import style from '../../scss/Style.css'
import Popup from "../../components/Popup/Popup";
import AddComplaintModal from "../../components/AddComplaintModal/AddComplaintModal";

function Header({user,setUser}) {

    const [popup, setPopup] = useState(false)
    const [addComplaintOpen, setAddComplaintOpen] = useState(false); // состояние для открытия модального окна
    return (
        <header>
            <div className={style.container}>
                <nav className={styles.header__nav}>
                    <div className={styles.header__left}>
                        <h1 className='header__title'><Link to='/'>city platform</Link></h1>
                        <Link className='header__link' to='#'>Главная</Link>
                        <Link className='header__link' to='#'>Личный кабинет</Link>
                    </div>
                    <div className={styles.header__right}>
                        {

                            user && user.name ? (<p>{user.name}</p>) :
                                (<p  onClick={() => setPopup(true)} className='header__login'>  Войти - Регистрация</p>)
                        }
                        <button  onClick={() => setAddComplaintOpen(true)} type={'button'} className={styles.button}>Подать жалобу</button>
                    </div>
                </nav>
            </div>
            {
                popup && <Popup user={user} setUser={setUser} popup={popup} setPopup={setPopup}/>

            }
            {addComplaintOpen && <AddComplaintModal setAddComplaintOpen={setAddComplaintOpen} />}
</header>
    );
}

export default Header;