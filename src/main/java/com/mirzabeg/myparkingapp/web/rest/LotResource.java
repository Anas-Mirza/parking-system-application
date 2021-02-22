package com.mirzabeg.myparkingapp.web.rest;

import com.mirzabeg.myparkingapp.domain.Lot;
import com.mirzabeg.myparkingapp.repository.LotRepository;
import com.mirzabeg.myparkingapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mirzabeg.myparkingapp.domain.Lot}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LotResource {

    private final Logger log = LoggerFactory.getLogger(LotResource.class);

    private static final String ENTITY_NAME = "lot";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LotRepository lotRepository;

    public LotResource(LotRepository lotRepository) {
        this.lotRepository = lotRepository;
    }

    /**
     * {@code POST  /lots} : Create a new lot.
     *
     * @param lot the lot to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lot, or with status {@code 400 (Bad Request)} if the lot has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lots")
    public ResponseEntity<Lot> createLot(@Valid @RequestBody Lot lot) throws URISyntaxException {
        log.debug("REST request to save Lot : {}", lot);
        if (lot.getId() != null) {
            throw new BadRequestAlertException("A new lot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lot result = lotRepository.save(lot);
        return ResponseEntity.created(new URI("/api/lots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lots} : Updates an existing lot.
     *
     * @param lot the lot to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lot,
     * or with status {@code 400 (Bad Request)} if the lot is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lot couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lots")
    public ResponseEntity<Lot> updateLot(@Valid @RequestBody Lot lot) throws URISyntaxException {
        log.debug("REST request to update Lot : {}", lot);
        if (lot.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Lot result = lotRepository.save(lot);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lot.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /lots} : get all the lots.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lots in body.
     */
    @GetMapping("/lots")
    public List<Lot> getAllLots() {
        log.debug("REST request to get all Lots");
        return lotRepository.findAll();
    }

    /**
     * {@code GET  /lots/:id} : get the "id" lot.
     *
     * @param id the id of the lot to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lot, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lots/{id}")
    public ResponseEntity<Lot> getLot(@PathVariable Long id) {
        log.debug("REST request to get Lot : {}", id);
        Optional<Lot> lot = lotRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lot);
    }

    /**
     * {@code DELETE  /lots/:id} : delete the "id" lot.
     *
     * @param id the id of the lot to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lots/{id}")
    public ResponseEntity<Void> deleteLot(@PathVariable Long id) {
        log.debug("REST request to delete Lot : {}", id);
        lotRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
