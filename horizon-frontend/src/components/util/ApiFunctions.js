import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:9191'
});

// esta funcion es para agregar una nueva habitacion en la base de datos
export async function addRoom(photo, roomType, roomPrice) {
    const forDtata = new FormData();
    forDtata.append('photo', photo);
    forDtata.append('roomType', roomType);
    forDtata.append('roomPrice', roomPrice);

    const response = await api.post('/rooms/add/new-room', forDtata)
    if (response.status === 201) {
        return true;

    }
    else {
        return false;
    } 

}


// esta funcion es para obtener todos los tipos de habitaciones
export async function getRoomTypes() {
    try {
        const response = await api.get('/rooms/room/types');
        return response.data;
    }
    catch (error) {
        throw new Error('Failed to fetch room types: ' + error.message);
    }
}

/* esta funcion recupera todas las habitaciones de la base de datos*/
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch (error) {
        throw new Error("Error al buscar habitaciones")
    }
}

// esta funcion es para eliminar una habitacion de la base de datos
export async function deleteRoom(roomId){
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error al eliminar la habitación ${error.message}`);
        
    }
}