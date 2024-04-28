import { FC, useState } from "react"
import imageSrc from '../assets/logo.png'
import imageSrcPaste from '../assets/paste.png'
import '../css/RegistrationPageMentor.css'
import { useNavigate } from 'react-router-dom';

const RegistrationPageMentor: FC = () => {
    const [username, setUsername] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [diplom, setDiplom] = useState<File>()
    const navigate = useNavigate();
  
    const handleClick = () => {
        navigate('/reg/user'); 
};
  return (
    <div className="rpm-body">
        <div className="rpm-logo">
            <p className="rpm-title">Вітаємо в</p>
            <img src={imageSrc} alt="Кудись подівалось"></img>
        </div>
        <div className="rpm-registration">
            <div className="rpm-choise-user">
                <button  id="rpm-user" type="button" onClick={handleClick}>Користувач</button>
                <button id="rpm-mentor">Експерт</button>
            </div>
            <div className="rpm-form-container">
                <p className="rpm-title">Зареєструватися</p>
                <form className="rpm-form">
                    <div className="rpm-input">
                        <input type="text" name="username" id="rpm-username" placeholder="Ім'я користувача" onChange={(e) => setUsername(e.target.value)} required></input>
                        <input type="text" name="name" id="rpm-name" placeholder="Ім'я" onChange={(e) => setName(e.target.value)} required></input>
                        <input type="text" name="lastname" id="rpm-lastname" placeholder="Прізвище" onChange={(e) => setLastname(e.target.value)} required></input>
                        <input type="password" name="password" id="rpm-password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required></input>
                        <label>
                            Сертифікат/Диплом
                            <input type="file" name="diplom" id="rpm-diplom" onChange={(e) => setDiplom(e.target.files?.[0])} multiple ></input>
                            <img src={imageSrcPaste}></img>
                        </label>
                    </div>
                    <button className="rpm-save">Зберегти</button>
                    <a href="/auth/mentor">Вже зареєстровані?</a>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RegistrationPageMentor