package com.mirzabeg.myparkingapp.web.rest;

import com.mirzabeg.myparkingapp.ParkingSystemApplicationApp;
import com.mirzabeg.myparkingapp.domain.Booking;
import com.mirzabeg.myparkingapp.domain.Lot;
import com.mirzabeg.myparkingapp.repository.BookingRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BookingResource} REST controller.
 */
@SpringBootTest(classes = ParkingSystemApplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BookingResourceIT {

    private static final String DEFAULT_VEHICLENO = "AAAAAAAAAA";
    private static final String UPDATED_VEHICLENO = "BBBBBBBBBB";

    private static final Instant DEFAULT_ENTRYTIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ENTRYTIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_EXITTIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EXITTIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBookingMockMvc;

    private Booking booking;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Booking createEntity(EntityManager em) {
        Booking booking = new Booking()
            .vehicleno(DEFAULT_VEHICLENO)
            .entrytime(DEFAULT_ENTRYTIME)
            .exittime(DEFAULT_EXITTIME);
        // Add required entity
        Lot lot;
        if (TestUtil.findAll(em, Lot.class).isEmpty()) {
            lot = LotResourceIT.createEntity(em);
            em.persist(lot);
            em.flush();
        } else {
            lot = TestUtil.findAll(em, Lot.class).get(0);
        }
        booking.setLot(lot);
        return booking;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Booking createUpdatedEntity(EntityManager em) {
        Booking booking = new Booking()
            .vehicleno(UPDATED_VEHICLENO)
            .entrytime(UPDATED_ENTRYTIME)
            .exittime(UPDATED_EXITTIME);
        // Add required entity
        Lot lot;
        if (TestUtil.findAll(em, Lot.class).isEmpty()) {
            lot = LotResourceIT.createUpdatedEntity(em);
            em.persist(lot);
            em.flush();
        } else {
            lot = TestUtil.findAll(em, Lot.class).get(0);
        }
        booking.setLot(lot);
        return booking;
    }

    @BeforeEach
    public void initTest() {
        booking = createEntity(em);
    }

    @Test
    @Transactional
    public void createBooking() throws Exception {
        int databaseSizeBeforeCreate = bookingRepository.findAll().size();
        // Create the Booking
        restBookingMockMvc.perform(post("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(booking)))
            .andExpect(status().isCreated());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeCreate + 1);
        Booking testBooking = bookingList.get(bookingList.size() - 1);
        assertThat(testBooking.getVehicleno()).isEqualTo(DEFAULT_VEHICLENO);
        assertThat(testBooking.getEntrytime()).isEqualTo(DEFAULT_ENTRYTIME);
        assertThat(testBooking.getExittime()).isEqualTo(DEFAULT_EXITTIME);
    }

    @Test
    @Transactional
    public void createBookingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bookingRepository.findAll().size();

        // Create the Booking with an existing ID
        booking.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBookingMockMvc.perform(post("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(booking)))
            .andExpect(status().isBadRequest());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkVehiclenoIsRequired() throws Exception {
        int databaseSizeBeforeTest = bookingRepository.findAll().size();
        // set the field null
        booking.setVehicleno(null);

        // Create the Booking, which fails.


        restBookingMockMvc.perform(post("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(booking)))
            .andExpect(status().isBadRequest());

        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBookings() throws Exception {
        // Initialize the database
        bookingRepository.saveAndFlush(booking);

        // Get all the bookingList
        restBookingMockMvc.perform(get("/api/bookings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(booking.getId().intValue())))
            .andExpect(jsonPath("$.[*].vehicleno").value(hasItem(DEFAULT_VEHICLENO)))
            .andExpect(jsonPath("$.[*].entrytime").value(hasItem(DEFAULT_ENTRYTIME.toString())))
            .andExpect(jsonPath("$.[*].exittime").value(hasItem(DEFAULT_EXITTIME.toString())));
    }
    
    @Test
    @Transactional
    public void getBooking() throws Exception {
        // Initialize the database
        bookingRepository.saveAndFlush(booking);

        // Get the booking
        restBookingMockMvc.perform(get("/api/bookings/{id}", booking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(booking.getId().intValue()))
            .andExpect(jsonPath("$.vehicleno").value(DEFAULT_VEHICLENO))
            .andExpect(jsonPath("$.entrytime").value(DEFAULT_ENTRYTIME.toString()))
            .andExpect(jsonPath("$.exittime").value(DEFAULT_EXITTIME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBooking() throws Exception {
        // Get the booking
        restBookingMockMvc.perform(get("/api/bookings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBooking() throws Exception {
        // Initialize the database
        bookingRepository.saveAndFlush(booking);

        int databaseSizeBeforeUpdate = bookingRepository.findAll().size();

        // Update the booking
        Booking updatedBooking = bookingRepository.findById(booking.getId()).get();
        // Disconnect from session so that the updates on updatedBooking are not directly saved in db
        em.detach(updatedBooking);
        updatedBooking
            .vehicleno(UPDATED_VEHICLENO)
            .entrytime(UPDATED_ENTRYTIME)
            .exittime(UPDATED_EXITTIME);

        restBookingMockMvc.perform(put("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBooking)))
            .andExpect(status().isOk());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeUpdate);
        Booking testBooking = bookingList.get(bookingList.size() - 1);
        assertThat(testBooking.getVehicleno()).isEqualTo(UPDATED_VEHICLENO);
        assertThat(testBooking.getEntrytime()).isEqualTo(UPDATED_ENTRYTIME);
        assertThat(testBooking.getExittime()).isEqualTo(UPDATED_EXITTIME);
    }

    @Test
    @Transactional
    public void updateNonExistingBooking() throws Exception {
        int databaseSizeBeforeUpdate = bookingRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBookingMockMvc.perform(put("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(booking)))
            .andExpect(status().isBadRequest());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBooking() throws Exception {
        // Initialize the database
        bookingRepository.saveAndFlush(booking);

        int databaseSizeBeforeDelete = bookingRepository.findAll().size();

        // Delete the booking
        restBookingMockMvc.perform(delete("/api/bookings/{id}", booking.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
