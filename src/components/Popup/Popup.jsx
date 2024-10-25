import React, {useState} from 'react';
import styles from '../../scss/popup.module.css'
import axios from "../../axios";

function Popup({popup, setPopup, user, setUser}) {
    
    const [status, setStatus] = useState('signIn')
    const popupCloserFunc = (e) => {
        if (e.target.classList.contains(`${styles.overlay}`)) {
            setPopup(false)
        }
    }
    const signInHandler = (e) => {

        axios.post('/login', {
            name: e.target[0].value,
            password: e.target[1].value
        }).then(({data}) => {
            e.target[0].value = ''
            e.target[1].value = ''
            setPopup(false)
            localStorage.setItem('user', JSON.stringify((data.user)))

        })
    }
    const signUpHandler = (e) => {
        axios.post( '/users ', {
            name: e.target[0].value,
            region: e.target[1].value,
            password: e.target[2].value
        }).then(({data}) => {

            setUser(data.user)
            localStorage.setItem('user', JSON.stringify((data.user)))
            setPopup(false)
            e.target[0].value = ''
            e.target[1].value = ''
            e.target[2].value = ''

        }).catch(err => alert(err))
    }
    return (
        <div onClick={(e) => popupCloserFunc(e)} className={`${styles.overlay} ${popup && `${styles.overlayActive}`}`}>
            <div className={styles.popup}>
                <form onSubmit={(e) => {
                    if (status === 'signIn') {
                        signInHandler(e)
                    }else {
                        signUpHandler(e)
                }}} className="popup__form">
                    <div className={styles.popup__formTop}>
                        <h2 onClick={() => {setStatus('signIn')}} className={`${styles.popup__title} ${status === 'signIn' && `${styles.active}`}`}>Войти</h2>
                        <h2 onClick={() => {setStatus('signUp')}} className={`${styles.popup__title} ${status === 'signUp' && `${styles.active}`}`}>Регистрация</h2>
                    </div>
                    <input className={styles.input} type="text"
                    placeholder='Введите ФИО'/>
                    {
                        status === 'signUp' &&
                        <input className={styles.input} type="text"
                        placeholder='Введите Район'/>
                    }
                    <input className={styles.input} type="password"/>
                    <button  className={styles.button} type={'submit'}>{status === 'signIn'? 'Войти' : 'Регистрация'}</button>
                </form>
            </div>

        </div>
    );
}

export default Popup;