import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "./Header";
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa";

const HotelService = () => {
    return(
        <>
            <Container className="mb-2 ">
                <Header title={"Nuestros Servicios"}/>
                <Row>
                    <h4 className="text-center">
                        En <span className="hotel-color">Horizon Hotel</span>, ofrecemos
                        <span className="gap-2">
                            <FaClock/> - Servicio 24/7
                            
                        </span>
                    </h4>
                </Row>
                <hr />
                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaWifi/> Wi-Fi Gratuito
                                </Card.Title>
                                <Card.Text>
                                    Disfruta de conexión Wi-Fi gratuita en todas las áreas del hotel.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaUtensils/> Restaurante
                                </Card.Title>
                                <Card.Text>
                                    Saborea deliciosos platos en nuestro restaurante de alta cocina.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaTshirt/> Lavandería
                                </Card.Title>
                                <Card.Text>
                                    Servicio de lavandería disponible para su comodidad.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaTshirt/> Lavandería
                                </Card.Title>
                                <Card.Text>
                                    Servicio de lavandería disponible para su comodidad.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaCocktail/> Mini-bar
                                </Card.Title>
                                <Card.Text>
                                    Disfruta de una selección de bebidas y aperitivos en tu habitación.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaParking/> Estacionamiento
                                </Card.Title>
                                <Card.Text>
                                    Estacionamiento seguro y gratuito para nuestros huéspedes.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaSnowflake/> Aire Acondicionado
                                </Card.Title>
                                <Card.Text>
                                    Habitaciones equipadas con aire acondicionado para tu comodidad.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default HotelService;