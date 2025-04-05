package com.ericktecnm.horizon_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ericktecnm.horizon_backend.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
    // Por ejemplo, para buscar habitaciones por tipo o precio
    // List<Room> findByRoomType(String roomType);
    // List<Room> findByRoomPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    

}
