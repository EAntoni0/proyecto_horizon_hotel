package com.ericktecnm.horizon_backend.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ericktecnm.horizon_backend.model.Room;
import com.ericktecnm.horizon_backend.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService {

    private final RoomRepository roomRepository;

    // Implementación del método addNewRoom
    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws IOException, SerialException, SQLException {
        // Aquí iría la lógica para agregar una nueva habitación
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);

        if (!file.isEmpty() ) {
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



}
