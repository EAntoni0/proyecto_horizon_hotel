import React, { useState } from "react";



const RoomFilter = ({data = [], setFilteredData}) => {
    const [filter, setFilter] = useState("");

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType);
        const filteredRooms = data.filter((room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()));
        setFilteredData(filteredRooms);
    }

    const clearfilter = () => {
        setFilter("");
        setFilteredData(data);
    }

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="room-type-filter">Filtrar habitaciones por tipo</span>

            <select 
                className="form-select"
                value={filter}
                onChange={handleSelectChange}>
                
                <option value={""}>Todas las Habitaciones</option>
                {roomTypes
                .filter(type => type !== "") // Filtrar tipos vacíos
                .map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            
            <button className="btn btn-hotel" type="button" onClick={clearfilter}>
                Limpiar filtro
            </button>

        </div>  
    )
}

export default RoomFilter;