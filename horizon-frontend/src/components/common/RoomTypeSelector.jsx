import React, {useState, useEffect } from "react";
import { getRoomTypes } from "../util/ApiFunctions";


const RoomTypeSelector = ({handleRoomInputChange, newRoom})=> {

    const[roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypeIput, setShowNewRoomTypesInput] = useState(false);
    const[newRoomType, setNewRoomType] = useState("");

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        })

    } , []);

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
           setRoomTypes([...roomTypes, newRoomType]);
           setNewRoomType("");
           setShowNewRoomTypesInput(false);
           setErrorMessage(""); 
        }
    }

    return(
        <>
        {roomTypes.length > 0 && (
            <div>
                <select 
                    name="roomType" 
                    id="roomType"
                    className="form-select"
                    value={newRoom.roomType}
                    onChange={(e) => {
                        if(e.target.value === "Add New"){
                            setShowNewRoomTypesInput(true);   
                        } else {
                            handleRoomInputChange(e);
                        }
                        }}
                >
                    <option value={""}>
                        Selecciona el tipo de habitacion
                    </option>
                    <option value={"Add New"}>
                        Agregar nuevo tipo de habitacion
                    </option>
                    {roomTypes.map((roomType, index) => (
                        <option key={index} value={roomType}>
                            {roomType}
                        </option>
                    ))}
                </select>
                {showNewRoomTypeIput && (
                    <div className="input-group">
                        <input 
                            className="form-control"
                            placeholder="Ingresa un nuevo tipo de habitacion"
                            type="text"  
                            onChange={handleNewRoomTypeInputChange}
                        />
                        <button 
                            className="btn btn-hotel"
                            type="button"
                            onClick={handleAddNewRoomType}>
                            Agregar
                        </button>
                    </div>
                )}
            </div>
        )}
        </>
    )

}

export default RoomTypeSelector;