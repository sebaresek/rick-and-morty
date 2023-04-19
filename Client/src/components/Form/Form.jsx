import { useState } from "react";
import validation from "./Validation";
import style from "./Form.module.css";
// import fondo from '../assets/img/fondo.png'

const Form = ({ login }) => {
    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })

        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData);
    }

    return(
        <div className={style.formContainer} >
            <form className={style.form} onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input type="email" name='email' value={userData.email} onChange={handleChange}/>
            {errors.email && <p style={{ color: "red"}}>{errors.email}</p>}
                <br/>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={userData.password} onChange={handleChange}/>
            {errors.password && <p style={{ color: "red"}}>{errors.password}</p>}

                <button>LOGIN</button>
            </form>
        </div>
    )
}

export default Form;