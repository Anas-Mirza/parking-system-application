package com.mirzabeg.myparkingapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Lot.
 */
@Entity
@Table(name = "lot")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Lot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull
    @Size(min = 6)
    @Column(name = "zipcode", nullable = false)
    private String zipcode;

    @NotNull
    @Column(name = "maxslots", nullable = false)
    private Integer maxslots;

    @Column(name = "availableslots")
    private Integer availableslots;

    @Column(name = "isopen")
    private Boolean isopen;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Lot name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Lot address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipcode() {
        return zipcode;
    }

    public Lot zipcode(String zipcode) {
        this.zipcode = zipcode;
        return this;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public Integer getMaxslots() {
        return maxslots;
    }

    public Lot maxslots(Integer maxslots) {
        this.maxslots = maxslots;
        return this;
    }

    public void setMaxslots(Integer maxslots) {
        this.maxslots = maxslots;
    }

    public Integer getAvailableslots() {
        return availableslots;
    }

    public Lot availableslots(Integer availableslots) {
        this.availableslots = availableslots;
        return this;
    }

    public void setAvailableslots(Integer availableslots) {
        this.availableslots = availableslots;
    }

    public Boolean isIsopen() {
        return isopen;
    }

    public Lot isopen(Boolean isopen) {
        this.isopen = isopen;
        return this;
    }

    public void setIsopen(Boolean isopen) {
        this.isopen = isopen;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Lot)) {
            return false;
        }
        return id != null && id.equals(((Lot) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Lot{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", zipcode='" + getZipcode() + "'" +
            ", maxslots=" + getMaxslots() +
            ", availableslots=" + getAvailableslots() +
            ", isopen='" + isIsopen() + "'" +
            "}";
    }
}
