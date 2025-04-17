import React, { useState, useEffect } from "react";
import { getAllRooms } from "../util/ApiFunctions";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import {Col} from "react-bootstrap";

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

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalrooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalrooms / roomsPerPage);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    
    
    return(
        <>
        {isloading ? (
            <p>Cargando habitaciones existentes</p>
        ): (
            <>
            <section className="mt-5 mb-5 container">
                <div className="d-flex justify-content-center mb-3 mt-3">
                    <h2>
                        Habitaciones existentes
                    </h2>

                </div>
                <Col md={6} className="mb-3 mb-md-0">
                   <RoomFilter data={rooms} setFilteredData ={setFilteredRooms}/>
                    
                </Col>

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
                        <tr key = {room.id} className="text-center">
                            <td>{room.id}</td>
                            <td>{room.roomType}</td>
                            <td>{room.roomPrice}</td>
                            <td>
                                <button>Ver / Editar</button>
                                <button>Eliminar</button>
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