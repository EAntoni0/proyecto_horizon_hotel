import React, {useState, useEffect } from "react";
import { getRoomById, updateRoom } from "../util/ApiFunctions";
import { useParams, Link} from "react-router-dom";

const EditRoom = () => {

    const [room, setRoom] = useState({

        photo: null,
        roomType: "",
        roomPrice: "",

    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { roomId } = useParams(); // Assuming you're using react-router-dom to get the roomId from the URL


    const handleImageChange = (e) => {

        const selectedImage = e.target.files[0];
        setRoom({ ...room, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRoom({
            ...room,
            [name]: value,
        });
    }

    useEffect(() => {

        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId);
                setRoom(roomData);
                setImagePreview(roomData.photo);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }

        fetchRoom();
        // Cleanup function to reset state if component unmounts

    }, [roomId])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateRoom(roomId, room);
            if (response.status === 200) {
                setSuccessMessage("Habitacion actualizada correctamente !");
                const updateRoomData = await getRoomById(roomId);
                setRoom(updateRoomData);
                setImagePreview(updateRoomData.photo);
                setErrorMessage("");
            } else {
                setErrorMessage("Error al actualizar la habitacion.");
            }
        } catch (error) {
            setErrorMessage(error.message);

        }

    }

    return (
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">Editar Habitacion</h3>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {successMessage && (
                        <div className="alert alert-success fade show" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger fade show" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label hotel-color">Tipo de Habitacion</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roomType"
                                name="roomType"
                                value={room.roomType}
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label hotel-color">Precio de Habitacion</label>
                            <input
                                type="number"
                                className="form-control"
                                id="roomPrice"
                                name="roomPrice"
                                value={room.roomPrice}
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label hotel-color">Foto de Habitacion</label>
                            <input
                                type="file"
                                className="form-control"
                                id="photo"
                                name="photo"
                                onChange={handleImageChange}
                                required 
                            />

                            {imagePreview && (
                                <img
                                    src={`data:image/jpeg;base64,${imagePreview}`}
                                    alt="Room Preview"
                                    style={{ maxWidthidth: "400px%", maxHeight: "400px" }}
                                    className="mt-3" 
                                />
                            )}
                        </div>
                        <div className="d-grid gap-2 d-md-flex mt-2"> 
                            <Link 
                                to={"/existing-rooms"} 
                                className="btn btn-outline-info ml-5" >
                                Volver
                            </Link>
                            <button type="submit" className="btn btn-outline-warning">
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditRoom