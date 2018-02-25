package io.myfamilytree.service;

import io.myfamilytree.service.dto.MarriageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Marriage.
 */
public interface MarriageService {

    /**
     * Save a marriage.
     *
     * @param marriageDTO the entity to save
     * @return the persisted entity
     */
    MarriageDTO save(MarriageDTO marriageDTO);

    /**
     * Get all the marriages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MarriageDTO> findAll(Pageable pageable);

    /**
     * Get the "id" marriage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MarriageDTO findOne(Long id);

    /**
     * Delete the "id" marriage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the marriage corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MarriageDTO> search(String query, Pageable pageable);
}
