package com.mirzabeg.myparkingapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Wallet.
 */
@Entity
@Table(name = "wallet")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Wallet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "money")
    private Integer money;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMoney() {
        return money;
    }

    public Wallet money(Integer money) {
        this.money = money;
        return this;
    }

    public void setMoney(Integer money) {
        this.money = money;
    }

    public User getUser() {
        return user;
    }

    public Wallet user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Wallet)) {
            return false;
        }
        return id != null && id.equals(((Wallet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Wallet{" +
            "id=" + getId() +
            ", money=" + getMoney() +
            "}";
    }
}
