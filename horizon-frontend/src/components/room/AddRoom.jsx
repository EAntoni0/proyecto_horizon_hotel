import React, { useState } from "react";
import { addRoom } from "../util/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";


const AddRoom = () => {

  const [newRoom, setNewRoom] = useState({

    photo: null,
    roomType: "",
    roomPrice: "",

  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }

    setNewRoom({
      ...newRoom,
      [name]: value,
    });

  }

  const handleImageChange = (e) => {

    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      if (success !== undefined) {
        setSuccessMessage("Habitacion agregada correctamente !");
        setNewRoom({
          photo: null,
          roomType: "",
          roomPrice: "",
        });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error al agregar nueva habitacion.");
      }
    } catch (error) {
      setErrorMessage(error.message);

    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  }

  return (
    <>

      <section className="container, mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Agregar nueva habitacion</h2>

            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">
                {errorMessage}
              </div>
            )}


            <form onSubmit={handleSubmit} action="">

              <div className="mb3">
                <label htmlFor="roomType" className="form-label">
                  Tipo de habitacion
                </label>
                <div>
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={newRoom} />
                </div>
              </div>



              <div className="mb3">
                <label htmlFor="roomPrice" className="form-label">
                  Precio de la habitacion
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="roomPrice"
                  id="roomPrice"
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
                  required
                />
              </div>

              <div className="mb3">
                <label htmlFor="photo" className="form-label">
                  Foto de la habitacion
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img src={imagePreview}
                    alt="foto habitacion"
                    className="mb-3"
                    style={{
                      maxWidth: "400px",
                      maxHeight: "200px"
                    }} />
                )}
              </div>

              <div className="d-grid d-md-flex mt-2">
                <button className="btn btn-outline-primary ml-5">
                  Agregar habitacion
                </button>
              </div>

            </form>

          </div>
        </div>
      </section>

    </>
  );
}

export default AddRoom;