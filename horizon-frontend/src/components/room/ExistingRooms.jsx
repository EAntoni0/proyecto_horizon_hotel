import React, { useState, useEffect } from "react";
import { deleteRoom, getAllRooms } from "../util/ApiFunctions";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


const ExistingRooms = () => {

    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isloading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchRooms();
    }, [])

    const fetchRooms = async () => {
        setIsLoading(true);
        try {

            const result = await getAllRooms();
            setRooms(result);
            setIsLoading(false);

        } catch (error) {
            setErrorMessage(error.message);
        }

    }

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }

        setCurrentPage(1);

    }, [rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleDelete = async (roomId) => {
        try {
            const result = await deleteRoom(roomId);
            if (result === "") {
                setSuccessMessage(`Habitación # ${roomId} eliminada con éxito`);
                fetchRooms();
            } else {
                console.error(`Error al eliminar la habitación: ${result.message}`);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");

        }, 3000)

    }

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalrooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalrooms / roomsPerPage);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);



    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <div className="alert alert-success mt-5">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger mt-5">{errorMessage}</div>}
            </div>

            {isloading ? (
                <p>Cargando habitaciones existentes</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>
                                Habitaciones existentes
                            </h2>
                        </div>
                        <Row>
                            <Col md={6} className="mb-3 mb-md-0">
                                <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />

                            </Col>

                            <Col md={6} className="d-flex justify-content-end">
                                <Link to={"/add-room"}>
                                    <FaPlus /> Agregar Habitacion
                                </Link>
                            </Col>
                        </Row>

                        <table className="table table-bodered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Tipo</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.id} className="text-center">
                                        <td>{room.id}</td>
                                        <td>{room.roomType}</td>
                                        <td>{room.roomPrice}</td>
                                        <td className="gap-2">

                                            <Link to={`/edit-room/${room.id}`}>
                                                <span className="btn btn-info btn-sm me-2">
                                                    <FaEye />
                                                </span>
                                                <span className="btn btn-warning btn-sm me-2">
                                                    <FaEdit />
                                                </span>
                                            </Link>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(room.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                            onPageChange={handlePaginationClick}


                        />
                    </section>
                </>

            )}
        </>
    )

}

export default ExistingRooms;