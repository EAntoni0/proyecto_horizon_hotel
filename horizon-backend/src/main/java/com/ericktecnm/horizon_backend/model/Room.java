package com.ericktecnm.horizon_backend.model;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;


import org.apache.commons.lang3.RandomStringUtils;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity // La anotación @Entity indica que esta clase es una entidad JPA y se mapeará a una tabla en la base de datos

// anotaciones de lombok para generar automáticamente los métodos getter y setter
@Getter
@Setter
@AllArgsConstructor // Genera un constructor con todos los atributos de la clase

public class Room {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked = false;

    @Lob
    private Blob photo; // Se utiliza un tipo de datos Blob para almacenar imágenes en la base de datos

    //esta relación indica que una habitación puede tener múltiples reservas asociadas a ella
    // y que cada reserva está asociada a una sola habitación
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedRoom> bookings;

    public Room() {
        this.bookings = new ArrayList<>();
    }

    // este método se utiliza para agregar una reserva a la lista de reservas de la habitación
    // y también establece la habitación en la reserva
    public void addBooking(BookedRoom booking) {
        // Verifica si la lista de reservas es nula y la inicializa si es necesario
        // Esto es útil para evitar NullPointerException al agregar una reserva
        if (bookings == null) {
            bookings = new ArrayList<>();
        }

        bookings.add(booking);
        booking.setRoom(this); // Establece la habitación en la reserva

        isBooked = true; // Marca la habitación como reservada
        String bookingCode = RandomStringUtils.randomNumeric(10); // Genera un código de reserva aleatorio de 10 dígitos
        // Se utiliza la biblioteca Apache Commons Lang para generar un código de reserva aleatorio
        booking.setBookingConfirmationCode(bookingCode); // Establece el código de reserva en la reserva
    }

}
