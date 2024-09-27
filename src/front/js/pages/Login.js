import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        actions.login({
            email: email,
            password: password,
        });
        navigate("/demo")
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-4">Login</h1>
                    <form
                        onSubmit={(e) => {login(e)}}
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
                            Login
                        </button>

                        {/* Botón para ir a la página de registro */}
                        <div className="text-center">
                            <p>¿No tienes una cuenta?</p>
                            <Link to="/register" className="btn btn-link">
                                Regístrate aquí
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
