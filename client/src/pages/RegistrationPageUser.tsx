import { FC, useState } from "react"
import imageSrc from '../assets/logo.png'
import '../css/RegistrationPageUser.css'
import { useNavigate } from "react-router-dom"

const RegistrationPageUser: FC = () => {
    const [username, setUsername] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/reg/mentor'); 
  };
  return (
    <div className="rpu-body">
        <div className="rpu-logo">
            <p className="rpu-title">Вітаємо в</p>
            <img src={imageSrc} alt="Кудись подівалось"></img>
        </div>
        <div className="rpu-registration">
            <div className="rpu-choise-user">
                <button  id="rpu-user" >Користувач</button>
                <button id="rpu-mentor" type="button" onClick={handleClick}>Експерт</button>
            </div>
            <div className="rpu-form-container">
                <p className="rpu-title">Зареєструватися</p>
                <form className="rpu-form">
                    <div className="rpu-input">
                        <input type="text" name="username" id="rpu-username" placeholder="Ім'я користувача" onChange={(e) => setUsername(e.target.value)} required></input>
                        <input type="text" name="name" id="rpu-name" placeholder="Ім'я" onChange={(e) => setName(e.target.value)} required></input>
                        <input type="text" name="lastname" id="rpu-lastname" placeholder="Прізвище" onChange={(e) => setLastname(e.target.value)} required></input>
                        <input type="password" name="password" id="rpu-password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                    <button className="rpu-save">Зберегти</button>
                    <a href="/auth/user">Вже зареєстровані?</a>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RegistrationPageUser