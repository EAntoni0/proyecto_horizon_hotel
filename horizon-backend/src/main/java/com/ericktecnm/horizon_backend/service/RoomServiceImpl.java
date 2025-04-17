package com.ericktecnm.horizon_backend.service;

import java.io.IOException;
import java.lang.foreign.Linker.Option;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ericktecnm.horizon_backend.exception.ResourceNotFoundException;
import com.ericktecnm.horizon_backend.model.Room;
import com.ericktecnm.horizon_backend.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService {

    private final RoomRepository roomRepository;

    // Implementación del método addNewRoom
    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice)
            throws IOException, SerialException, SQLException {
        // Aquí iría la lógica para agregar una nueva habitación
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);

        if (!file.isEmpty()) {
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob); // Almacena la imagen en la base de datos
        }

        return roomRepository.save(room); // Cambia esto por la implementación real
    }

    @Override
    public List<String> getAllRoomTypes() {
        // TODO Auto-generated method stub
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        // TODO Auto-generated method stub
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(long roomId) throws SQLException {
        // TODO Auto-generated method stub
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if (theRoom.isEmpty()) {
            throw new ResourceNotFoundException("Habitacion con el id: " + roomId + " no encontrado");
        }
        Blob photBlob = theRoom.get().getPhoto();
        if (photBlob != null) {
            return photBlob.getBytes(1, (int) photBlob.length());
        }
        return null;
    }

    @Override
    public void deleteRoom(Long roomId) {
        // TODO Auto-generated method stub}
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if (theRoom.isPresent()) {

            roomRepository.deleteById(roomId);
            
        }
    }

}
