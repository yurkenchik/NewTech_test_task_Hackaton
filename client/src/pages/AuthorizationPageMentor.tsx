import { FC, useState } from 'react'
import imageSrc from '../assets/logo.png'
import '../css/AuthorizationPageMentor.css'
import { useNavigate } from 'react-router-dom';

const AuthorizationPageMentor: FC = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();
  
    const handleClick = () => {
        navigate('/auth/user'); 
};
  return (
    <div className='apm-body'>
        <div className="apm-logo">
            <p className="apm-title">Вітаємо в</p>
            <img src={imageSrc} alt="Кудись подівалось"></img>
        </div>
        <div className="apm-authorization">
            <div className="apm-choise-user">
                <button  id="apm-user" type="button" onClick={handleClick}>Користувач</button>
                <button id="apm-mentor">Експерт</button>
            </div>
            <div className="apm-form-container">
                <p className="apm-title">Увійти</p>
                <form className="apm-form">
                    <div className="apm-input">
                        <input type="text" name="username" id="apm-username" placeholder="Ім'я користувача" onChange={(e) => setUsername(e.target.value)} required></input>
                        <input type="password" name="password" id="apm-password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                    <button className="apm-save">Зберегти</button>
                    <a href="/reg/mentor">Ще не зареєстровані?</a>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AuthorizationPageMentor