
import React, { useState, useEffect } from "react";
import { getAllRooms } from "../util/ApiFunctions";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";


const RoomCarousel = () => {

    const [rooms, setRooms] = useState([{id:"", roomType:"", roomPrice:"", photo:""}]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms().then((data) => {
            setRooms(data);
            setIsLoading(false);
        }).catch((error) => {
            setErrorMessage("Error fetching rooms: " + error.message);
            setIsLoading(false);
        })

    }, [])

    if (isLoading) {
        return <div className="mt-5">Cargando habitaciones...</div>;
    }

    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5">Error al cargar habitaciones: {errorMessage}</div>;
    }

    return (
        <section className="bg-light mb-5 mt-5 shadow">
            <Link to={"/browse-all-rooms"} className="hotel-color text-center">
                Explorar todas las habitaciones
            </Link>
            <Container>
                <Carousel indicators={false} >
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/book-room/${room.id}`}>
                                                <Card.Img
                                                    variant="top"
                                                    src={`data:image/jpeg;base64,${room.photo}`}
                                                    alt="foto de la habitación"
                                                    className="w-100"
                                                    style={{height: "200px"}}
                                                />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title className="hotel-color">
                                                    {room.roomType}
                                                </Card.Title>
                                                <Card.Title className="room-price">
                                                    {room.roomPrice}/noche
                                                </Card.Title>
                                                <div className="flex-shrink-0">

                                                    <Link className="btn btn-sm btn-hotel" to={`/book-room/${room.id}`}>
                                                        Reservar Ahora
                                                    </Link>

                                                </div>
                                            </Card.Body>

                                        </Card>
                                    </Col>
                                ))
                                }
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    )


}

export default RoomCarousel;