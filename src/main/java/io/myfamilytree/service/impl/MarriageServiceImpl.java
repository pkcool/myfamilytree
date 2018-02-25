package io.myfamilytree.service.impl;

import io.myfamilytree.service.MarriageService;
import io.myfamilytree.domain.Marriage;
import io.myfamilytree.repository.MarriageRepository;
import io.myfamilytree.repository.search.MarriageSearchRepository;
import io.myfamilytree.service.dto.MarriageDTO;
import io.myfamilytree.service.mapper.MarriageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Marriage.
 */
@Service
@Transactional
public class MarriageServiceImpl implements MarriageService {

    private final Logger log = LoggerFactory.getLogger(MarriageServiceImpl.class);

    private final MarriageRepository marriageRepository;

    private final MarriageMapper marriageMapper;

    private final MarriageSearchRepository marriageSearchRepository;

    public MarriageServiceImpl(MarriageRepository marriageRepository, MarriageMapper marriageMapper, MarriageSearchRepository marriageSearchRepository) {
        this.marriageRepository = marriageRepository;
        this.marriageMapper = marriageMapper;
        this.marriageSearchRepository = marriageSearchRepository;
    }

    /**
     * Save a marriage.
     *
     * @param marriageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MarriageDTO save(MarriageDTO marriageDTO) {
        log.debug("Request to save Marriage : {}", marriageDTO);
        Marriage marriage = marriageMapper.toEntity(marriageDTO);
        marriage = marriageRepository.save(marriage);
        MarriageDTO result = marriageMapper.toDto(marriage);
        marriageSearchRepository.save(marriage);
        return result;
    }

    /**
     * Get all the marriages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MarriageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Marriages");
        return marriageRepository.findAll(pageable)
            .map(marriageMapper::toDto);
    }

    /**
     * Get one marriage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MarriageDTO findOne(Long id) {
        log.debug("Request to get Marriage : {}", id);
        Marriage marriage = marriageRepository.findOne(id);
        return marriageMapper.toDto(marriage);
    }

    /**
     * Delete the marriage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Marriage : {}", id);
        marriageRepository.delete(id);
        marriageSearchRepository.delete(id);
    }

    /**
     * Search for the marriage corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MarriageDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Marriages for query {}", query);
        Page<Marriage> result = marriageSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(marriageMapper::toDto);
    }
}
