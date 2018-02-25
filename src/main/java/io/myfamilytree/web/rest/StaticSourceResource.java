package io.myfamilytree.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.myfamilytree.service.StaticSourceService;
import io.myfamilytree.web.rest.errors.BadRequestAlertException;
import io.myfamilytree.web.rest.util.HeaderUtil;
import io.myfamilytree.web.rest.util.PaginationUtil;
import io.myfamilytree.service.dto.StaticSourceDTO;
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
 * REST controller for managing StaticSource.
 */
@RestController
@RequestMapping("/api")
public class StaticSourceResource {

    private final Logger log = LoggerFactory.getLogger(StaticSourceResource.class);

    private static final String ENTITY_NAME = "staticSource";

    private final StaticSourceService staticSourceService;

    public StaticSourceResource(StaticSourceService staticSourceService) {
        this.staticSourceService = staticSourceService;
    }

    /**
     * POST  /static-sources : Create a new staticSource.
     *
     * @param staticSourceDTO the staticSourceDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new staticSourceDTO, or with status 400 (Bad Request) if the staticSource has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/static-sources")
    @Timed
    public ResponseEntity<StaticSourceDTO> createStaticSource(@RequestBody StaticSourceDTO staticSourceDTO) throws URISyntaxException {
        log.debug("REST request to save StaticSource : {}", staticSourceDTO);
        if (staticSourceDTO.getId() != null) {
            throw new BadRequestAlertException("A new staticSource cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StaticSourceDTO result = staticSourceService.save(staticSourceDTO);
        return ResponseEntity.created(new URI("/api/static-sources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /static-sources : Updates an existing staticSource.
     *
     * @param staticSourceDTO the staticSourceDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated staticSourceDTO,
     * or with status 400 (Bad Request) if the staticSourceDTO is not valid,
     * or with status 500 (Internal Server Error) if the staticSourceDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/static-sources")
    @Timed
    public ResponseEntity<StaticSourceDTO> updateStaticSource(@RequestBody StaticSourceDTO staticSourceDTO) throws URISyntaxException {
        log.debug("REST request to update StaticSource : {}", staticSourceDTO);
        if (staticSourceDTO.getId() == null) {
            return createStaticSource(staticSourceDTO);
        }
        StaticSourceDTO result = staticSourceService.save(staticSourceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, staticSourceDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /static-sources : get all the staticSources.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of staticSources in body
     */
    @GetMapping("/static-sources")
    @Timed
    public ResponseEntity<List<StaticSourceDTO>> getAllStaticSources(Pageable pageable) {
        log.debug("REST request to get a page of StaticSources");
        Page<StaticSourceDTO> page = staticSourceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/static-sources");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /static-sources/:id : get the "id" staticSource.
     *
     * @param id the id of the staticSourceDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the staticSourceDTO, or with status 404 (Not Found)
     */
    @GetMapping("/static-sources/{id}")
    @Timed
    public ResponseEntity<StaticSourceDTO> getStaticSource(@PathVariable Long id) {
        log.debug("REST request to get StaticSource : {}", id);
        StaticSourceDTO staticSourceDTO = staticSourceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(staticSourceDTO));
    }

    /**
     * DELETE  /static-sources/:id : delete the "id" staticSource.
     *
     * @param id the id of the staticSourceDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/static-sources/{id}")
    @Timed
    public ResponseEntity<Void> deleteStaticSource(@PathVariable Long id) {
        log.debug("REST request to delete StaticSource : {}", id);
        staticSourceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/static-sources?query=:query : search for the staticSource corresponding
     * to the query.
     *
     * @param query the query of the staticSource search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/static-sources")
    @Timed
    public ResponseEntity<List<StaticSourceDTO>> searchStaticSources(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of StaticSources for query {}", query);
        Page<StaticSourceDTO> page = staticSourceService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/static-sources");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
