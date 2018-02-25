package io.myfamilytree.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.myfamilytree.service.MarriageService;
import io.myfamilytree.web.rest.errors.BadRequestAlertException;
import io.myfamilytree.web.rest.util.HeaderUtil;
import io.myfamilytree.web.rest.util.PaginationUtil;
import io.myfamilytree.service.dto.MarriageDTO;
import io.myfamilytree.service.dto.MarriageCriteria;
import io.myfamilytree.service.MarriageQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Marriage.
 */
@RestController
@RequestMapping("/api")
public class MarriageResource {

    private final Logger log = LoggerFactory.getLogger(MarriageResource.class);

    private static final String ENTITY_NAME = "marriage";

    private final MarriageService marriageService;

    private final MarriageQueryService marriageQueryService;

    public MarriageResource(MarriageService marriageService, MarriageQueryService marriageQueryService) {
        this.marriageService = marriageService;
        this.marriageQueryService = marriageQueryService;
    }

    /**
     * POST  /marriages : Create a new marriage.
     *
     * @param marriageDTO the marriageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new marriageDTO, or with status 400 (Bad Request) if the marriage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/marriages")
    @Timed
    public ResponseEntity<MarriageDTO> createMarriage(@RequestBody MarriageDTO marriageDTO) throws URISyntaxException {
        log.debug("REST request to save Marriage : {}", marriageDTO);
        if (marriageDTO.getId() != null) {
            throw new BadRequestAlertException("A new marriage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MarriageDTO result = marriageService.save(marriageDTO);
        return ResponseEntity.created(new URI("/api/marriages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /marriages : Updates an existing marriage.
     *
     * @param marriageDTO the marriageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated marriageDTO,
     * or with status 400 (Bad Request) if the marriageDTO is not valid,
     * or with status 500 (Internal Server Error) if the marriageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/marriages")
    @Timed
    public ResponseEntity<MarriageDTO> updateMarriage(@RequestBody MarriageDTO marriageDTO) throws URISyntaxException {
        log.debug("REST request to update Marriage : {}", marriageDTO);
        if (marriageDTO.getId() == null) {
            return createMarriage(marriageDTO);
        }
        MarriageDTO result = marriageService.save(marriageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, marriageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /marriages : get all the marriages.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of marriages in body
     */
    @GetMapping("/marriages")
    @Timed
    public ResponseEntity<List<MarriageDTO>> getAllMarriages(MarriageCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Marriages by criteria: {}", criteria);
        Page<MarriageDTO> page = marriageQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/marriages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /marriages/:id : get the "id" marriage.
     *
     * @param id the id of the marriageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the marriageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/marriages/{id}")
    @Timed
    public ResponseEntity<MarriageDTO> getMarriage(@PathVariable Long id) {
        log.debug("REST request to get Marriage : {}", id);
        MarriageDTO marriageDTO = marriageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(marriageDTO));
    }

    /**
     * DELETE  /marriages/:id : delete the "id" marriage.
     *
     * @param id the id of the marriageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/marriages/{id}")
    @Timed
    public ResponseEntity<Void> deleteMarriage(@PathVariable Long id) {
        log.debug("REST request to delete Marriage : {}", id);
        marriageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/marriages?query=:query : search for the marriage corresponding
     * to the query.
     *
     * @param query the query of the marriage search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/marriages")
    @Timed
    public ResponseEntity<List<MarriageDTO>> searchMarriages(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Marriages for query {}", query);
        Page<MarriageDTO> page = marriageService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/marriages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
