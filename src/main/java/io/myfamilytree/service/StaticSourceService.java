package io.myfamilytree.service;

import io.myfamilytree.service.dto.StaticSourceDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing StaticSource.
 */
public interface StaticSourceService {

    /**
     * Save a staticSource.
     *
     * @param staticSourceDTO the entity to save
     * @return the persisted entity
     */
    StaticSourceDTO save(StaticSourceDTO staticSourceDTO);

    /**
     * Get all the staticSources.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<StaticSourceDTO> findAll(Pageable pageable);

    /**
     * Get the "id" staticSource.
     *
     * @param id the id of the entity
     * @return the entity
     */
    StaticSourceDTO findOne(Long id);

    /**
     * Delete the "id" staticSource.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the staticSource corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<StaticSourceDTO> search(String query, Pageable pageable);
}
