import React from "react";
import { Container } from "react-bootstrap";

const Parallax = () => {
    return(
        <div className="parallax mb-5">
            <Container className="text-center px-5 py-5 justify-content-center">
                <div className="animated-texts bounceIn">
                <h1>Bienvenido a <span className="hotel-color">Horizon Hotel</span></h1>
                <h3>Más que una reserva, una solución a tu medida</h3>
                </div>
            </Container>
        </div>
    )
}

export default Parallax;