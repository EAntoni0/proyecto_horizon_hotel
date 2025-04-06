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

    const response = await api.post('/roomsroom/add/new-', forDtata)
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
        const response = await api.get('/rooms/room-types');
        return response.data;
    }
    catch (error) {
        throw new Error('Failed to fetch room types: ' + error.message);
    }
}