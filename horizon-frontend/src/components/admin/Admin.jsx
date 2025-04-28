import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {

    return(
        <section className="container mt-5">
            <h2>Bienvenido al panel de administracion</h2>
            <hr />
            <Link to={"/add-room"}>
                Administra las habitaciones
            </Link>
        </section>
    )

}

export default Admin;