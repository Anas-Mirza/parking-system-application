package com.mirzabeg.myparkingapp.web.rest;

import com.mirzabeg.myparkingapp.ParkingSystemApplicationApp;
import com.mirzabeg.myparkingapp.domain.Lot;
import com.mirzabeg.myparkingapp.repository.LotRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LotResource} REST controller.
 */
@SpringBootTest(classes = ParkingSystemApplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LotResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_ZIPCODE = "AAAAAAAAAA";
    private static final String UPDATED_ZIPCODE = "BBBBBBBBBB";

    private static final Integer DEFAULT_MAXSLOTS = 1;
    private static final Integer UPDATED_MAXSLOTS = 2;

    private static final Integer DEFAULT_AVAILABLESLOTS = 1;
    private static final Integer UPDATED_AVAILABLESLOTS = 2;

    private static final Boolean DEFAULT_ISOPEN = false;
    private static final Boolean UPDATED_ISOPEN = true;

    @Autowired
    private LotRepository lotRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLotMockMvc;

    private Lot lot;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lot createEntity(EntityManager em) {
        Lot lot = new Lot()
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS)
            .zipcode(DEFAULT_ZIPCODE)
            .maxslots(DEFAULT_MAXSLOTS)
            .availableslots(DEFAULT_AVAILABLESLOTS)
            .isopen(DEFAULT_ISOPEN);
        return lot;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lot createUpdatedEntity(EntityManager em) {
        Lot lot = new Lot()
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .zipcode(UPDATED_ZIPCODE)
            .maxslots(UPDATED_MAXSLOTS)
            .availableslots(UPDATED_AVAILABLESLOTS)
            .isopen(UPDATED_ISOPEN);
        return lot;
    }

    @BeforeEach
    public void initTest() {
        lot = createEntity(em);
    }

    @Test
    @Transactional
    public void createLot() throws Exception {
        int databaseSizeBeforeCreate = lotRepository.findAll().size();
        // Create the Lot
        restLotMockMvc.perform(post("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lot)))
            .andExpect(status().isCreated());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeCreate + 1);
        Lot testLot = lotList.get(lotList.size() - 1);
        assertThat(testLot.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLot.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testLot.getZipcode()).isEqualTo(DEFAULT_ZIPCODE);
        assertThat(testLot.getMaxslots()).isEqualTo(DEFAULT_MAXSLOTS);
        assertThat(testLot.getAvailableslots()).isEqualTo(DEFAULT_AVAILABLESLOTS);
        assertThat(testLot.isIsopen()).isEqualTo(DEFAULT_ISOPEN);
    }

    @Test
    @Transactional
    public void createLotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lotRepository.findAll().size();

        // Create the Lot with an existing ID
        lot.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLotMockMvc.perform(post("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lot)))
            .andExpect(status().isBadRequest());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = lotRepository.findAll().size();
        // set the field null
        lot.setName(null);

        // Create the Lot, which fails.


        restLotMockMvc.perform(post("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lot)))
            .andExpect(status().isBadRequest());

        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = lotRepository.findAll().size();
        // set the field null
        lot.setAddress(null);

        // Create the Lot, which fails.


        restLotMockMvc.perform(post("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lot)))
            .andExpect(status().isBadRequest());

        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkZipcodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = lotRepository.findAll().size();
        // set the field null
        lot.setZipcode(null);

        // Create the Lot, which fails.


        restLotMockMvc.perform(post("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lot)))
            .andExpect(status().isBadRequest());

        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMaxslotsIsRequired() throws Exception {
        int databaseSizeBeforeTest = lotRepository.findAll().size();
        // set the field null
        lot.setMaxslots(null);

        // Create the Lot, which fails.


        restLotMockMvc.perform(post("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lot)))
            .andExpect(status().isBadRequest());

        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLots() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList
        restLotMockMvc.perform(get("/api/lots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lot.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].zipcode").value(hasItem(DEFAULT_ZIPCODE)))
            .andExpect(jsonPath("$.[*].maxslots").value(hasItem(DEFAULT_MAXSLOTS)))
            .andExpect(jsonPath("$.[*].availableslots").value(hasItem(DEFAULT_AVAILABLESLOTS)))
            .andExpect(jsonPath("$.[*].isopen").value(hasItem(DEFAULT_ISOPEN.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get the lot
        restLotMockMvc.perform(get("/api/lots/{id}", lot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(lot.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.zipcode").value(DEFAULT_ZIPCODE))
            .andExpect(jsonPath("$.maxslots").value(DEFAULT_MAXSLOTS))
            .andExpect(jsonPath("$.availableslots").value(DEFAULT_AVAILABLESLOTS))
            .andExpect(jsonPath("$.isopen").value(DEFAULT_ISOPEN.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingLot() throws Exception {
        // Get the lot
        restLotMockMvc.perform(get("/api/lots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        int databaseSizeBeforeUpdate = lotRepository.findAll().size();

        // Update the lot
        Lot updatedLot = lotRepository.findById(lot.getId()).get();
        // Disconnect from session so that the updates on updatedLot are not directly saved in db
        em.detach(updatedLot);
        updatedLot
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .zipcode(UPDATED_ZIPCODE)
            .maxslots(UPDATED_MAXSLOTS)
            .availableslots(UPDATED_AVAILABLESLOTS)
            .isopen(UPDATED_ISOPEN);

        restLotMockMvc.perform(put("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLot)))
            .andExpect(status().isOk());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeUpdate);
        Lot testLot = lotList.get(lotList.size() - 1);
        assertThat(testLot.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLot.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testLot.getZipcode()).isEqualTo(UPDATED_ZIPCODE);
        assertThat(testLot.getMaxslots()).isEqualTo(UPDATED_MAXSLOTS);
        assertThat(testLot.getAvailableslots()).isEqualTo(UPDATED_AVAILABLESLOTS);
        assertThat(testLot.isIsopen()).isEqualTo(UPDATED_ISOPEN);
    }

    @Test
    @Transactional
    public void updateNonExistingLot() throws Exception {
        int databaseSizeBeforeUpdate = lotRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLotMockMvc.perform(put("/api/lots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lot)))
            .andExpect(status().isBadRequest());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        int databaseSizeBeforeDelete = lotRepository.findAll().size();

        // Delete the lot
        restLotMockMvc.perform(delete("/api/lots/{id}", lot.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
