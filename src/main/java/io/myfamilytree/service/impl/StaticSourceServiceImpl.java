package io.myfamilytree.service.impl;

import io.myfamilytree.service.StaticSourceService;
import io.myfamilytree.domain.StaticSource;
import io.myfamilytree.repository.StaticSourceRepository;
import io.myfamilytree.repository.search.StaticSourceSearchRepository;
import io.myfamilytree.service.dto.StaticSourceDTO;
import io.myfamilytree.service.mapper.StaticSourceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing StaticSource.
 */
@Service
@Transactional
public class StaticSourceServiceImpl implements StaticSourceService {

    private final Logger log = LoggerFactory.getLogger(StaticSourceServiceImpl.class);

    private final StaticSourceRepository staticSourceRepository;

    private final StaticSourceMapper staticSourceMapper;

    private final StaticSourceSearchRepository staticSourceSearchRepository;

    public StaticSourceServiceImpl(StaticSourceRepository staticSourceRepository, StaticSourceMapper staticSourceMapper, StaticSourceSearchRepository staticSourceSearchRepository) {
        this.staticSourceRepository = staticSourceRepository;
        this.staticSourceMapper = staticSourceMapper;
        this.staticSourceSearchRepository = staticSourceSearchRepository;
    }

    /**
     * Save a staticSource.
     *
     * @param staticSourceDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StaticSourceDTO save(StaticSourceDTO staticSourceDTO) {
        log.debug("Request to save StaticSource : {}", staticSourceDTO);
        StaticSource staticSource = staticSourceMapper.toEntity(staticSourceDTO);
        staticSource = staticSourceRepository.save(staticSource);
        StaticSourceDTO result = staticSourceMapper.toDto(staticSource);
        staticSourceSearchRepository.save(staticSource);
        return result;
    }

    /**
     * Get all the staticSources.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StaticSourceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all StaticSources");
        return staticSourceRepository.findAll(pageable)
            .map(staticSourceMapper::toDto);
    }

    /**
     * Get one staticSource by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public StaticSourceDTO findOne(Long id) {
        log.debug("Request to get StaticSource : {}", id);
        StaticSource staticSource = staticSourceRepository.findOne(id);
        return staticSourceMapper.toDto(staticSource);
    }

    /**
     * Delete the staticSource by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete StaticSource : {}", id);
        staticSourceRepository.delete(id);
        staticSourceSearchRepository.delete(id);
    }

    /**
     * Search for the staticSource corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StaticSourceDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of StaticSources for query {}", query);
        Page<StaticSource> result = staticSourceSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(staticSourceMapper::toDto);
    }
}
