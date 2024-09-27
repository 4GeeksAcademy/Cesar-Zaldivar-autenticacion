import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import { Context } from "../store/appContext";

const Register = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-4">Registro de Usuario</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            actions.register({
                                email: email,
                                name: name,
                                password: password,
                            });
                        }}
                        className="border p-4 shadow-sm bg-light"
                    >
                        <div className="form-group mb-3">
                            <label>Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3">
                            Registrarse
                        </button>

                        {/* Botón para ir a la página de login */}
                        <div className="text-center">
                            <p>¿Ya tienes una cuenta?</p>
                            <Link to="/login" className="btn btn-link">
                                Iniciar sesión
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
