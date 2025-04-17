package com.ericktecnm.horizon_backend.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ericktecnm.horizon_backend.model.BookedRoom;
import com.ericktecnm.horizon_backend.model.Room;
import com.ericktecnm.horizon_backend.response.BookingResponse;
import com.ericktecnm.horizon_backend.response.RoomResponse;
import com.ericktecnm.horizon_backend.service.BookingService;
import com.ericktecnm.horizon_backend.service.IRoomService;
import com.ericktecnm.horizon_backend.exception.*;

import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:5173") //anotacion de Spring que permite que el frontend que corre en localhost:5173 (Vite) pueda hacer peticiones a este backend
@RestController //Le dice a Spring que esta clase manejará peticiones HTTP y que sus métodos devolverán respuestas JSON.

@RequiredArgsConstructor //Genera un constructor con 1 parámetro para cada campo que requiera un manejo especial

//Define que todas las rutas aquí empezarán con /rooms
@RequestMapping("/rooms")

public class RoomController {

    private final IRoomService roomService;
    private final BookingService bookingService;

    @PostMapping("/add/new-room")

    // este metodo es para agregar una nueva habitación

    public ResponseEntity<RoomResponse> addNewRom(

            //Usa @RequestParam porque los datos vienen de un formulario o envío tipo multipart/form-data.
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SerialException, IOException, SQLException {
        // TODO Auto-generated method stub

        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);

        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(),
                savedRoom.getRoomPrice());

        return ResponseEntity.ok(response);

    }

    @GetMapping("/room/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : rooms) {
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String base64Photo = Base64.encodeBase64String(photoBytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(base64Photo);
                roomResponses.add(roomResponse);
            }
            
        }

        return ResponseEntity.ok(roomResponses);

    }

    @DeleteMapping("/delete/room/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {
        roomService.deleteRoom(roomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private RoomResponse getRoomResponse(Room room) {
        // TODO Auto-generated method stub
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());
        /*List<BookingResponse> bookingInfo = bookings
                .stream()
                .map(booking -> new BookingResponse(
                    booking.getId(), 
                    booking.getCheckInDate(), 
                    booking.getCheckOutDate(),
                    booking.getBookingConfirmationCode()
                    )
                    ).toList();*/

        byte[] photoBytes = null;
        Blob photoBlob = room.getPhoto();
        if (photoBlob!= null) {
            try {
               photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (Exception e) {
                // TODO: handle exception
                throw new PhotoRetrievalException("Error al recuperar la imagen");
            }
        }

        return new RoomResponse(room.getId(), 
                                room.getRoomType(), 
                                room.getRoomPrice(), 
                                room.isBooked(), photoBytes);

    }

    private List<BookedRoom> getAllBookingsByRoomId(long roomId) {
        // TODO Auto-generated method stub
        return bookingService.getAllBookingsByRoomId(roomId);
    }

}
