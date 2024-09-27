import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; // Importamos Link para navegación
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
    const { store } = useContext(Context);

    // Suponiendo que el nombre del usuario está almacenado en el contexto
    const userName = store.userName || "Usuario"; // Cambia "userName" por el campo que uses

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">¡Bienvenido, {userName}!</h1>
            <img src={rigoImageUrl} className="img-fluid mb-4" alt="Rigo Baby" />
            <div className="alert alert-info">
                {store.message || "Cargando mensaje desde el backend (asegúrate de que tu backend en Python esté corriendo)..."}
            </div>
            <p className="mt-4">
                <strong className="text-danger">¡Soy muy aburrido, mejor mira abajo!</strong>
            </p>
            <p>
                ¿No tienes una cuenta? 
                <Link to="/register" className="btn btn-primary mx-2">
                    Regístrate aquí
                </Link>
            </p>
        </div>
    );
};
