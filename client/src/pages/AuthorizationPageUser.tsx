import { FC, useState } from 'react'
import imageSrc from '../assets/logo.png'
import '../css/AuthorizationPageUser.css'
import { useNavigate } from 'react-router-dom';

const AuthorizationPageUser: FC = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/auth/mentor'); 
  };
  return (
    <div className='apu-body'>
      <div className="apu-logo">
        <p className="apu-title">Вітаємо в</p>
        <img src={imageSrc} alt="Кудись подівалось"></img>
      </div>
      <div className="apu-authorization">
        <div className="apu-choise-user">
            <button  id="apu-user" >Користувач</button>
            <button id="apu-mentor" type="button" onClick={handleClick}>Експерт</button>
        </div>
        <div className="apu-form-container">
            <p className="apu-title">Увійти</p>
            <form className="apu-form">
                <div className="apu-input">
                    <input type="text" name="username" id="apu-username" placeholder="Ім'я користувача" onChange={(e) => setUsername(e.target.value)} required></input>
                    <input type="password" name="password" id="apu-password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <button className="apu-save">Зберегти</button>
                <a href="/reg/user">Ще не зареєстровані?</a>
            </form>
        </div>
      </div>
    </div>
  )
}

export default AuthorizationPageUser