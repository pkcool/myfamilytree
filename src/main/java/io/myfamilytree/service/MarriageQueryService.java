package io.myfamilytree.service;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import io.myfamilytree.domain.Marriage;
import io.myfamilytree.domain.*; // for static metamodels
import io.myfamilytree.repository.MarriageRepository;
import io.myfamilytree.repository.search.MarriageSearchRepository;
import io.myfamilytree.service.dto.MarriageCriteria;

import io.myfamilytree.service.dto.MarriageDTO;
import io.myfamilytree.service.mapper.MarriageMapper;

/**
 * Service for executing complex queries for Marriage entities in the database.
 * The main input is a {@link MarriageCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link MarriageDTO} or a {@link Page} of {@link MarriageDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class MarriageQueryService extends QueryService<Marriage> {

    private final Logger log = LoggerFactory.getLogger(MarriageQueryService.class);


    private final MarriageRepository marriageRepository;

    private final MarriageMapper marriageMapper;

    private final MarriageSearchRepository marriageSearchRepository;

    public MarriageQueryService(MarriageRepository marriageRepository, MarriageMapper marriageMapper, MarriageSearchRepository marriageSearchRepository) {
        this.marriageRepository = marriageRepository;
        this.marriageMapper = marriageMapper;
        this.marriageSearchRepository = marriageSearchRepository;
    }

    /**
     * Return a {@link List} of {@link MarriageDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<MarriageDTO> findByCriteria(MarriageCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Marriage> specification = createSpecification(criteria);
        return marriageMapper.toDto(marriageRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link MarriageDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<MarriageDTO> findByCriteria(MarriageCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Marriage> specification = createSpecification(criteria);
        final Page<Marriage> result = marriageRepository.findAll(specification, page);
        return result.map(marriageMapper::toDto);
    }

    /**
     * Function to convert MarriageCriteria to a {@link Specifications}
     */
    private Specifications<Marriage> createSpecification(MarriageCriteria criteria) {
        Specifications<Marriage> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Marriage_.id));
            }
            if (criteria.getDateOfMarriage() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDateOfMarriage(), Marriage_.dateOfMarriage));
            }
            if (criteria.getEndOfMarriage() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getEndOfMarriage(), Marriage_.endOfMarriage));
            }
            if (criteria.getNotes() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNotes(), Marriage_.notes));
            }
            if (criteria.getMaleId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getMaleId(), Marriage_.male, Person_.id));
            }
            if (criteria.getFemaleId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getFemaleId(), Marriage_.female, Person_.id));
            }
        }
        return specification;
    }

}
