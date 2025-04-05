package com.ericktecnm.horizon_backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

//esta clase representa una reserva de habitación
// y contiene información sobre la reserva, como las fechas de entrada y salida, el nombre del huésped, el correo electrónico, etc.
public class BookedRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(name = "check_In")
    private LocalDate checkInDate;

    @Column(name = "check_Out")
    //la fecha de salida se almacena en la base de datos como un campo de tipo DATE
    private LocalDate checkOutDate;

    @Column(name = "guest_Fullname")
    //el nombre completo del huésped se almacena en la base de datos como un campo de tipo VARCHAR 
    private String guestFullname;

    @Column(name = "guest_Email")
    //el correo electrónico del huésped se almacena en la base de datos como un campo de tipo VARCHAR
    // y se utiliza para enviar la confirmación de la reserva
    private String guestEmail;

    @Column(name = "adults")
    //el número de adultos se almacena en la base de datos como un campo de tipo INT
    // y se utiliza para calcular el número total de huéspedes
    private int NumOfAdults;

    @Column(name = "children")
    //el número de niños se almacena en la base de datos como un campo de tipo INT
    // y se utiliza para calcular el número total de huéspedes
    private int NumOfChildren;

    @Column(name = "total_Guests")
    //el número total de huéspedes se almacena en la base de datos como un campo de tipo INT
    private int totalNumOfGuest;

    @Column(name = "confirmation_Code")
    //el código de confirmación de la reserva se almacena en la base de datos como un campo de tipo VARCHAR
    private String bookingConfirmationCode;

    // esta relación indica que una reserva está asociada a una habitación específica
    // y se utiliza para obtener información sobre la habitación reservada
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_Id")
    //el ID de la habitación reservada se almacena en la base de datos como un campo de tipo INT
    private Room room;

    //este metodo se utiliza para calcular el número total de huéspedes
    public void calculateTotalNumOfGuest() {
        // sumando el número de adultos y niños y lo asignamos al atributo totalNumOfGuest
        this.totalNumOfGuest = this.NumOfAdults + this.NumOfChildren;
    }

    //cada vez que se establece el número de adultos o niños, se llama a este método para actualizar el total
    public void setNumOfAdults(int numOfAdults) {
        NumOfAdults = numOfAdults;
        calculateTotalNumOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        NumOfChildren = numOfChildren;
        calculateTotalNumOfGuest();
    }

    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }




}
