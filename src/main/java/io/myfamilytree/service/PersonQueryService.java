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

import io.myfamilytree.domain.Person;
import io.myfamilytree.domain.*; // for static metamodels
import io.myfamilytree.repository.PersonRepository;
import io.myfamilytree.repository.search.PersonSearchRepository;
import io.myfamilytree.service.dto.PersonCriteria;

import io.myfamilytree.service.dto.PersonDTO;
import io.myfamilytree.service.mapper.PersonMapper;
import io.myfamilytree.domain.enumeration.Sex;

/**
 * Service for executing complex queries for Person entities in the database.
 * The main input is a {@link PersonCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link PersonDTO} or a {@link Page} of {@link PersonDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PersonQueryService extends QueryService<Person> {

    private final Logger log = LoggerFactory.getLogger(PersonQueryService.class);


    private final PersonRepository personRepository;

    private final PersonMapper personMapper;

    private final PersonSearchRepository personSearchRepository;

    public PersonQueryService(PersonRepository personRepository, PersonMapper personMapper, PersonSearchRepository personSearchRepository) {
        this.personRepository = personRepository;
        this.personMapper = personMapper;
        this.personSearchRepository = personSearchRepository;
    }

    /**
     * Return a {@link List} of {@link PersonDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<PersonDTO> findByCriteria(PersonCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Person> specification = createSpecification(criteria);
        return personMapper.toDto(personRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link PersonDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<PersonDTO> findByCriteria(PersonCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Person> specification = createSpecification(criteria);
        final Page<Person> result = personRepository.findAll(specification, page);
        return result.map(personMapper::toDto);
    }

    /**
     * Function to convert PersonCriteria to a {@link Specifications}
     */
    private Specifications<Person> createSpecification(PersonCriteria criteria) {
        Specifications<Person> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Person_.id));
            }
            if (criteria.getIdNumber() != null) {
                specification = specification.and(buildStringSpecification(criteria.getIdNumber(), Person_.idNumber));
            }
            if (criteria.getSurname() != null) {
                specification = specification.and(buildStringSpecification(criteria.getSurname(), Person_.surname));
            }
            if (criteria.getForeNames() != null) {
                specification = specification.and(buildStringSpecification(criteria.getForeNames(), Person_.foreNames));
            }
            if (criteria.getSex() != null) {
                specification = specification.and(buildSpecification(criteria.getSex(), Person_.sex));
            }
            if (criteria.getPlaceOfBirth() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPlaceOfBirth(), Person_.placeOfBirth));
            }
            if (criteria.getDateOfBirth() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDateOfBirth(), Person_.dateOfBirth));
            }
            if (criteria.getPlaceOfDeath() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPlaceOfDeath(), Person_.placeOfDeath));
            }
            if (criteria.getDateOfDeath() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDateOfDeath(), Person_.dateOfDeath));
            }
            if (criteria.getBriefNote() != null) {
                specification = specification.and(buildStringSpecification(criteria.getBriefNote(), Person_.briefNote));
            }
            if (criteria.getNotes() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNotes(), Person_.notes));
            }
            if (criteria.getFatherId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getFatherId(), Person_.father, Person_.id));
            }
            if (criteria.getMotherId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getMotherId(), Person_.mother, Person_.id));
            }
            if (criteria.getSpouseId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getSpouseId(), Person_.spouse, Person_.id));
            }
            if (criteria.getPersonId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getPersonId(), Person_.person, Person_.id));
            }
            if (criteria.getChildrenId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getChildrenId(), Person_.children, Person_.id));
            }
            if (criteria.getSourceId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getSourceId(), Person_.sources, StaticSource_.id));
            }
        }
        return specification;
    }

}
