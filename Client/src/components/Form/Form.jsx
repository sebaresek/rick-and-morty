import { useState } from "react";
import validation from "./Validation";
import style from "./Form.module.css";
import axios from "axios";

const Form = ({ login }) => {
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false); // Nueva variable de estado para saber si se está registrando

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validation({
        ...userData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegistering) { // Si se está registrando, usa axios.post
      axios
        .post("https://rick-and-morty-production-a4ce.up.railway.app/rickandmorty/login/register", {
          password: userData.password,
          email: userData.email,
          id: 1,
        })
        .then(({ data }) => {
          console.log(data);
          alert("Registro exitoso. Por favor, inicie sesión.");
          window.location.href = "/";
          // Podrías redirigir al usuario a la página de inicio de sesión aquí
        });
    } else { // Si no, usa axios.get
      login(userData);
    }
  };

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password}</p>
        )}

        <button>{isRegistering ? "REGISTER" : "LOGIN"}</button>
        {!isRegistering && (
        <button onClick={handleRegisterClick}>REGISTER</button>
      )}
      </form>
      
    </div>
  );
};

export default Form;
