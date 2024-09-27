import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions, store } = useContext(Context)
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				{!store.auth ?

					<div className="ml-auto">
						<Link to="/login">
							<button className="btn btn-outline-primary mx-2">Iniciar sesion</button>
						</Link>
						<Link to="/register">
							<button className="btn btn-outline-primary mx-2">Registrarse</button>
						</Link>
					</div>
					:
					<Link to="/">
						<button className="btn btn-outline-primary mx-2"
						onClick={()=>actions.logOut()}
						>Cerrar sesion</button>
					</Link>
				}
			</div>
		</nav>
	);
};
