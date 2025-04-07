package com.ericktecnm.horizon_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ericktecnm.horizon_backend.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

    
    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();
    // Aquí puedes agregar métodos personalizados si es necesario
    // Por ejemplo, para buscar habitaciones por tipo o precio
    // List<Room> findByRoomType(String roomType);
    // List<Room> findByRoomPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    

}
