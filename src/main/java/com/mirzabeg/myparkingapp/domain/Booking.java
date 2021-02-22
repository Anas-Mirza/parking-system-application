package com.mirzabeg.myparkingapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Booking.
 */
@Entity
@Table(name = "booking")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "vehicleno", nullable = false)
    private String vehicleno;

    @Column(name = "entrytime")
    private Instant entrytime;

    @Column(name = "exittime")
    private Instant exittime;

    @ManyToOne
    @JsonIgnoreProperties(value = "bookings", allowSetters = true)
    private User user;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "bookings", allowSetters = true)
    private Lot lot;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleno() {
        return vehicleno;
    }

    public Booking vehicleno(String vehicleno) {
        this.vehicleno = vehicleno;
        return this;
    }

    public void setVehicleno(String vehicleno) {
        this.vehicleno = vehicleno;
    }

    public Instant getEntrytime() {
        return entrytime;
    }

    public Booking entrytime(Instant entrytime) {
        this.entrytime = entrytime;
        return this;
    }

    public void setEntrytime(Instant entrytime) {
        this.entrytime = entrytime;
    }

    public Instant getExittime() {
        return exittime;
    }

    public Booking exittime(Instant exittime) {
        this.exittime = exittime;
        return this;
    }

    public void setExittime(Instant exittime) {
        this.exittime = exittime;
    }

    public User getUser() {
        return user;
    }

    public Booking user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Lot getLot() {
        return lot;
    }

    public Booking lot(Lot lot) {
        this.lot = lot;
        return this;
    }

    public void setLot(Lot lot) {
        this.lot = lot;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Booking)) {
            return false;
        }
        return id != null && id.equals(((Booking) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Booking{" +
            "id=" + getId() +
            ", vehicleno='" + getVehicleno() + "'" +
            ", entrytime='" + getEntrytime() + "'" +
            ", exittime='" + getExittime() + "'" +
            "}";
    }
}
