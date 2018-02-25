package io.myfamilytree.web.rest;

import io.myfamilytree.MyfamilytreeApp;

import io.myfamilytree.domain.Person;
import io.myfamilytree.domain.Person;
import io.myfamilytree.domain.Person;
import io.myfamilytree.domain.Person;
import io.myfamilytree.domain.Person;
import io.myfamilytree.domain.Person;
import io.myfamilytree.domain.StaticSource;
import io.myfamilytree.repository.PersonRepository;
import io.myfamilytree.service.PersonService;
import io.myfamilytree.repository.search.PersonSearchRepository;
import io.myfamilytree.service.dto.PersonDTO;
import io.myfamilytree.service.mapper.PersonMapper;
import io.myfamilytree.web.rest.errors.ExceptionTranslator;
import io.myfamilytree.service.dto.PersonCriteria;
import io.myfamilytree.service.PersonQueryService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static io.myfamilytree.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.myfamilytree.domain.enumeration.Sex;
/**
 * Test class for the PersonResource REST controller.
 *
 * @see PersonResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyfamilytreeApp.class)
public class PersonResourceIntTest {

    private static final String DEFAULT_ID_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ID_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_FORE_NAMES = "AAAAAAAAAA";
    private static final String UPDATED_FORE_NAMES = "BBBBBBBBBB";

    private static final Sex DEFAULT_SEX = Sex.MALE;
    private static final Sex UPDATED_SEX = Sex.FEMALE;

    private static final String DEFAULT_PLACE_OF_BIRTH = "AAAAAAAAAA";
    private static final String UPDATED_PLACE_OF_BIRTH = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_OF_BIRTH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_BIRTH = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PLACE_OF_DEATH = "AAAAAAAAAA";
    private static final String UPDATED_PLACE_OF_DEATH = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_OF_DEATH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_DEATH = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_BRIEF_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_BRIEF_NOTE = "BBBBBBBBBB";

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private PersonService personService;

    @Autowired
    private PersonSearchRepository personSearchRepository;

    @Autowired
    private PersonQueryService personQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPersonMockMvc;

    private Person person;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonResource personResource = new PersonResource(personService, personQueryService);
        this.restPersonMockMvc = MockMvcBuilders.standaloneSetup(personResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Person createEntity(EntityManager em) {
        Person person = new Person()
            .idNumber(DEFAULT_ID_NUMBER)
            .surname(DEFAULT_SURNAME)
            .foreNames(DEFAULT_FORE_NAMES)
            .sex(DEFAULT_SEX)
            .placeOfBirth(DEFAULT_PLACE_OF_BIRTH)
            .dateOfBirth(DEFAULT_DATE_OF_BIRTH)
            .placeOfDeath(DEFAULT_PLACE_OF_DEATH)
            .dateOfDeath(DEFAULT_DATE_OF_DEATH)
            .briefNote(DEFAULT_BRIEF_NOTE)
            .notes(DEFAULT_NOTES);
        return person;
    }

    @Before
    public void initTest() {
        personSearchRepository.deleteAll();
        person = createEntity(em);
    }

    @Test
    @Transactional
    public void createPerson() throws Exception {
        int databaseSizeBeforeCreate = personRepository.findAll().size();

        // Create the Person
        PersonDTO personDTO = personMapper.toDto(person);
        restPersonMockMvc.perform(post("/api/people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isCreated());

        // Validate the Person in the database
        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeCreate + 1);
        Person testPerson = personList.get(personList.size() - 1);
        assertThat(testPerson.getIdNumber()).isEqualTo(DEFAULT_ID_NUMBER);
        assertThat(testPerson.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testPerson.getForeNames()).isEqualTo(DEFAULT_FORE_NAMES);
        assertThat(testPerson.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testPerson.getPlaceOfBirth()).isEqualTo(DEFAULT_PLACE_OF_BIRTH);
        assertThat(testPerson.getDateOfBirth()).isEqualTo(DEFAULT_DATE_OF_BIRTH);
        assertThat(testPerson.getPlaceOfDeath()).isEqualTo(DEFAULT_PLACE_OF_DEATH);
        assertThat(testPerson.getDateOfDeath()).isEqualTo(DEFAULT_DATE_OF_DEATH);
        assertThat(testPerson.getBriefNote()).isEqualTo(DEFAULT_BRIEF_NOTE);
        assertThat(testPerson.getNotes()).isEqualTo(DEFAULT_NOTES);

        // Validate the Person in Elasticsearch
        Person personEs = personSearchRepository.findOne(testPerson.getId());
        assertThat(personEs).isEqualToIgnoringGivenFields(testPerson);
    }

    @Test
    @Transactional
    public void createPersonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personRepository.findAll().size();

        // Create the Person with an existing ID
        person.setId(1L);
        PersonDTO personDTO = personMapper.toDto(person);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonMockMvc.perform(post("/api/people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Person in the database
        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPeople() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList
        restPersonMockMvc.perform(get("/api/people?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(person.getId().intValue())))
            .andExpect(jsonPath("$.[*].idNumber").value(hasItem(DEFAULT_ID_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].foreNames").value(hasItem(DEFAULT_FORE_NAMES.toString())))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].placeOfBirth").value(hasItem(DEFAULT_PLACE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].placeOfDeath").value(hasItem(DEFAULT_PLACE_OF_DEATH.toString())))
            .andExpect(jsonPath("$.[*].dateOfDeath").value(hasItem(DEFAULT_DATE_OF_DEATH.toString())))
            .andExpect(jsonPath("$.[*].briefNote").value(hasItem(DEFAULT_BRIEF_NOTE.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())));
    }

    @Test
    @Transactional
    public void getPerson() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get the person
        restPersonMockMvc.perform(get("/api/people/{id}", person.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(person.getId().intValue()))
            .andExpect(jsonPath("$.idNumber").value(DEFAULT_ID_NUMBER.toString()))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME.toString()))
            .andExpect(jsonPath("$.foreNames").value(DEFAULT_FORE_NAMES.toString()))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.placeOfBirth").value(DEFAULT_PLACE_OF_BIRTH.toString()))
            .andExpect(jsonPath("$.dateOfBirth").value(DEFAULT_DATE_OF_BIRTH.toString()))
            .andExpect(jsonPath("$.placeOfDeath").value(DEFAULT_PLACE_OF_DEATH.toString()))
            .andExpect(jsonPath("$.dateOfDeath").value(DEFAULT_DATE_OF_DEATH.toString()))
            .andExpect(jsonPath("$.briefNote").value(DEFAULT_BRIEF_NOTE.toString()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()));
    }

    @Test
    @Transactional
    public void getAllPeopleByIdNumberIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where idNumber equals to DEFAULT_ID_NUMBER
        defaultPersonShouldBeFound("idNumber.equals=" + DEFAULT_ID_NUMBER);

        // Get all the personList where idNumber equals to UPDATED_ID_NUMBER
        defaultPersonShouldNotBeFound("idNumber.equals=" + UPDATED_ID_NUMBER);
    }

    @Test
    @Transactional
    public void getAllPeopleByIdNumberIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where idNumber in DEFAULT_ID_NUMBER or UPDATED_ID_NUMBER
        defaultPersonShouldBeFound("idNumber.in=" + DEFAULT_ID_NUMBER + "," + UPDATED_ID_NUMBER);

        // Get all the personList where idNumber equals to UPDATED_ID_NUMBER
        defaultPersonShouldNotBeFound("idNumber.in=" + UPDATED_ID_NUMBER);
    }

    @Test
    @Transactional
    public void getAllPeopleByIdNumberIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where idNumber is not null
        defaultPersonShouldBeFound("idNumber.specified=true");

        // Get all the personList where idNumber is null
        defaultPersonShouldNotBeFound("idNumber.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleBySurnameIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where surname equals to DEFAULT_SURNAME
        defaultPersonShouldBeFound("surname.equals=" + DEFAULT_SURNAME);

        // Get all the personList where surname equals to UPDATED_SURNAME
        defaultPersonShouldNotBeFound("surname.equals=" + UPDATED_SURNAME);
    }

    @Test
    @Transactional
    public void getAllPeopleBySurnameIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where surname in DEFAULT_SURNAME or UPDATED_SURNAME
        defaultPersonShouldBeFound("surname.in=" + DEFAULT_SURNAME + "," + UPDATED_SURNAME);

        // Get all the personList where surname equals to UPDATED_SURNAME
        defaultPersonShouldNotBeFound("surname.in=" + UPDATED_SURNAME);
    }

    @Test
    @Transactional
    public void getAllPeopleBySurnameIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where surname is not null
        defaultPersonShouldBeFound("surname.specified=true");

        // Get all the personList where surname is null
        defaultPersonShouldNotBeFound("surname.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleByForeNamesIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where foreNames equals to DEFAULT_FORE_NAMES
        defaultPersonShouldBeFound("foreNames.equals=" + DEFAULT_FORE_NAMES);

        // Get all the personList where foreNames equals to UPDATED_FORE_NAMES
        defaultPersonShouldNotBeFound("foreNames.equals=" + UPDATED_FORE_NAMES);
    }

    @Test
    @Transactional
    public void getAllPeopleByForeNamesIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where foreNames in DEFAULT_FORE_NAMES or UPDATED_FORE_NAMES
        defaultPersonShouldBeFound("foreNames.in=" + DEFAULT_FORE_NAMES + "," + UPDATED_FORE_NAMES);

        // Get all the personList where foreNames equals to UPDATED_FORE_NAMES
        defaultPersonShouldNotBeFound("foreNames.in=" + UPDATED_FORE_NAMES);
    }

    @Test
    @Transactional
    public void getAllPeopleByForeNamesIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where foreNames is not null
        defaultPersonShouldBeFound("foreNames.specified=true");

        // Get all the personList where foreNames is null
        defaultPersonShouldNotBeFound("foreNames.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleBySexIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where sex equals to DEFAULT_SEX
        defaultPersonShouldBeFound("sex.equals=" + DEFAULT_SEX);

        // Get all the personList where sex equals to UPDATED_SEX
        defaultPersonShouldNotBeFound("sex.equals=" + UPDATED_SEX);
    }

    @Test
    @Transactional
    public void getAllPeopleBySexIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where sex in DEFAULT_SEX or UPDATED_SEX
        defaultPersonShouldBeFound("sex.in=" + DEFAULT_SEX + "," + UPDATED_SEX);

        // Get all the personList where sex equals to UPDATED_SEX
        defaultPersonShouldNotBeFound("sex.in=" + UPDATED_SEX);
    }

    @Test
    @Transactional
    public void getAllPeopleBySexIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where sex is not null
        defaultPersonShouldBeFound("sex.specified=true");

        // Get all the personList where sex is null
        defaultPersonShouldNotBeFound("sex.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleByPlaceOfBirthIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where placeOfBirth equals to DEFAULT_PLACE_OF_BIRTH
        defaultPersonShouldBeFound("placeOfBirth.equals=" + DEFAULT_PLACE_OF_BIRTH);

        // Get all the personList where placeOfBirth equals to UPDATED_PLACE_OF_BIRTH
        defaultPersonShouldNotBeFound("placeOfBirth.equals=" + UPDATED_PLACE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void getAllPeopleByPlaceOfBirthIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where placeOfBirth in DEFAULT_PLACE_OF_BIRTH or UPDATED_PLACE_OF_BIRTH
        defaultPersonShouldBeFound("placeOfBirth.in=" + DEFAULT_PLACE_OF_BIRTH + "," + UPDATED_PLACE_OF_BIRTH);

        // Get all the personList where placeOfBirth equals to UPDATED_PLACE_OF_BIRTH
        defaultPersonShouldNotBeFound("placeOfBirth.in=" + UPDATED_PLACE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void getAllPeopleByPlaceOfBirthIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where placeOfBirth is not null
        defaultPersonShouldBeFound("placeOfBirth.specified=true");

        // Get all the personList where placeOfBirth is null
        defaultPersonShouldNotBeFound("placeOfBirth.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth equals to DEFAULT_DATE_OF_BIRTH
        defaultPersonShouldBeFound("dateOfBirth.equals=" + DEFAULT_DATE_OF_BIRTH);

        // Get all the personList where dateOfBirth equals to UPDATED_DATE_OF_BIRTH
        defaultPersonShouldNotBeFound("dateOfBirth.equals=" + UPDATED_DATE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth in DEFAULT_DATE_OF_BIRTH or UPDATED_DATE_OF_BIRTH
        defaultPersonShouldBeFound("dateOfBirth.in=" + DEFAULT_DATE_OF_BIRTH + "," + UPDATED_DATE_OF_BIRTH);

        // Get all the personList where dateOfBirth equals to UPDATED_DATE_OF_BIRTH
        defaultPersonShouldNotBeFound("dateOfBirth.in=" + UPDATED_DATE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth is not null
        defaultPersonShouldBeFound("dateOfBirth.specified=true");

        // Get all the personList where dateOfBirth is null
        defaultPersonShouldNotBeFound("dateOfBirth.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth greater than or equals to DEFAULT_DATE_OF_BIRTH
        defaultPersonShouldBeFound("dateOfBirth.greaterOrEqualThan=" + DEFAULT_DATE_OF_BIRTH);

        // Get all the personList where dateOfBirth greater than or equals to UPDATED_DATE_OF_BIRTH
        defaultPersonShouldNotBeFound("dateOfBirth.greaterOrEqualThan=" + UPDATED_DATE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfBirthIsLessThanSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfBirth less than or equals to DEFAULT_DATE_OF_BIRTH
        defaultPersonShouldNotBeFound("dateOfBirth.lessThan=" + DEFAULT_DATE_OF_BIRTH);

        // Get all the personList where dateOfBirth less than or equals to UPDATED_DATE_OF_BIRTH
        defaultPersonShouldBeFound("dateOfBirth.lessThan=" + UPDATED_DATE_OF_BIRTH);
    }


    @Test
    @Transactional
    public void getAllPeopleByPlaceOfDeathIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where placeOfDeath equals to DEFAULT_PLACE_OF_DEATH
        defaultPersonShouldBeFound("placeOfDeath.equals=" + DEFAULT_PLACE_OF_DEATH);

        // Get all the personList where placeOfDeath equals to UPDATED_PLACE_OF_DEATH
        defaultPersonShouldNotBeFound("placeOfDeath.equals=" + UPDATED_PLACE_OF_DEATH);
    }

    @Test
    @Transactional
    public void getAllPeopleByPlaceOfDeathIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where placeOfDeath in DEFAULT_PLACE_OF_DEATH or UPDATED_PLACE_OF_DEATH
        defaultPersonShouldBeFound("placeOfDeath.in=" + DEFAULT_PLACE_OF_DEATH + "," + UPDATED_PLACE_OF_DEATH);

        // Get all the personList where placeOfDeath equals to UPDATED_PLACE_OF_DEATH
        defaultPersonShouldNotBeFound("placeOfDeath.in=" + UPDATED_PLACE_OF_DEATH);
    }

    @Test
    @Transactional
    public void getAllPeopleByPlaceOfDeathIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where placeOfDeath is not null
        defaultPersonShouldBeFound("placeOfDeath.specified=true");

        // Get all the personList where placeOfDeath is null
        defaultPersonShouldNotBeFound("placeOfDeath.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfDeathIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfDeath equals to DEFAULT_DATE_OF_DEATH
        defaultPersonShouldBeFound("dateOfDeath.equals=" + DEFAULT_DATE_OF_DEATH);

        // Get all the personList where dateOfDeath equals to UPDATED_DATE_OF_DEATH
        defaultPersonShouldNotBeFound("dateOfDeath.equals=" + UPDATED_DATE_OF_DEATH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfDeathIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfDeath in DEFAULT_DATE_OF_DEATH or UPDATED_DATE_OF_DEATH
        defaultPersonShouldBeFound("dateOfDeath.in=" + DEFAULT_DATE_OF_DEATH + "," + UPDATED_DATE_OF_DEATH);

        // Get all the personList where dateOfDeath equals to UPDATED_DATE_OF_DEATH
        defaultPersonShouldNotBeFound("dateOfDeath.in=" + UPDATED_DATE_OF_DEATH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfDeathIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfDeath is not null
        defaultPersonShouldBeFound("dateOfDeath.specified=true");

        // Get all the personList where dateOfDeath is null
        defaultPersonShouldNotBeFound("dateOfDeath.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfDeathIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfDeath greater than or equals to DEFAULT_DATE_OF_DEATH
        defaultPersonShouldBeFound("dateOfDeath.greaterOrEqualThan=" + DEFAULT_DATE_OF_DEATH);

        // Get all the personList where dateOfDeath greater than or equals to UPDATED_DATE_OF_DEATH
        defaultPersonShouldNotBeFound("dateOfDeath.greaterOrEqualThan=" + UPDATED_DATE_OF_DEATH);
    }

    @Test
    @Transactional
    public void getAllPeopleByDateOfDeathIsLessThanSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where dateOfDeath less than or equals to DEFAULT_DATE_OF_DEATH
        defaultPersonShouldNotBeFound("dateOfDeath.lessThan=" + DEFAULT_DATE_OF_DEATH);

        // Get all the personList where dateOfDeath less than or equals to UPDATED_DATE_OF_DEATH
        defaultPersonShouldBeFound("dateOfDeath.lessThan=" + UPDATED_DATE_OF_DEATH);
    }


    @Test
    @Transactional
    public void getAllPeopleByBriefNoteIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where briefNote equals to DEFAULT_BRIEF_NOTE
        defaultPersonShouldBeFound("briefNote.equals=" + DEFAULT_BRIEF_NOTE);

        // Get all the personList where briefNote equals to UPDATED_BRIEF_NOTE
        defaultPersonShouldNotBeFound("briefNote.equals=" + UPDATED_BRIEF_NOTE);
    }

    @Test
    @Transactional
    public void getAllPeopleByBriefNoteIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where briefNote in DEFAULT_BRIEF_NOTE or UPDATED_BRIEF_NOTE
        defaultPersonShouldBeFound("briefNote.in=" + DEFAULT_BRIEF_NOTE + "," + UPDATED_BRIEF_NOTE);

        // Get all the personList where briefNote equals to UPDATED_BRIEF_NOTE
        defaultPersonShouldNotBeFound("briefNote.in=" + UPDATED_BRIEF_NOTE);
    }

    @Test
    @Transactional
    public void getAllPeopleByBriefNoteIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where briefNote is not null
        defaultPersonShouldBeFound("briefNote.specified=true");

        // Get all the personList where briefNote is null
        defaultPersonShouldNotBeFound("briefNote.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleByNotesIsEqualToSomething() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where notes equals to DEFAULT_NOTES
        defaultPersonShouldBeFound("notes.equals=" + DEFAULT_NOTES);

        // Get all the personList where notes equals to UPDATED_NOTES
        defaultPersonShouldNotBeFound("notes.equals=" + UPDATED_NOTES);
    }

    @Test
    @Transactional
    public void getAllPeopleByNotesIsInShouldWork() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where notes in DEFAULT_NOTES or UPDATED_NOTES
        defaultPersonShouldBeFound("notes.in=" + DEFAULT_NOTES + "," + UPDATED_NOTES);

        // Get all the personList where notes equals to UPDATED_NOTES
        defaultPersonShouldNotBeFound("notes.in=" + UPDATED_NOTES);
    }

    @Test
    @Transactional
    public void getAllPeopleByNotesIsNullOrNotNull() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);

        // Get all the personList where notes is not null
        defaultPersonShouldBeFound("notes.specified=true");

        // Get all the personList where notes is null
        defaultPersonShouldNotBeFound("notes.specified=false");
    }

    @Test
    @Transactional
    public void getAllPeopleByFatherIsEqualToSomething() throws Exception {
        // Initialize the database
        Person father = PersonResourceIntTest.createEntity(em);
        em.persist(father);
        em.flush();
        person.setFather(father);
        personRepository.saveAndFlush(person);
        Long fatherId = father.getId();

        // Get all the personList where father equals to fatherId
        defaultPersonShouldBeFound("fatherId.equals=" + fatherId);

        // Get all the personList where father equals to fatherId + 1
        defaultPersonShouldNotBeFound("fatherId.equals=" + (fatherId + 1));
    }


    @Test
    @Transactional
    public void getAllPeopleByMotherIsEqualToSomething() throws Exception {
        // Initialize the database
        Person mother = PersonResourceIntTest.createEntity(em);
        em.persist(mother);
        em.flush();
        person.setMother(mother);
        personRepository.saveAndFlush(person);
        Long motherId = mother.getId();

        // Get all the personList where mother equals to motherId
        defaultPersonShouldBeFound("motherId.equals=" + motherId);

        // Get all the personList where mother equals to motherId + 1
        defaultPersonShouldNotBeFound("motherId.equals=" + (motherId + 1));
    }


    @Test
    @Transactional
    public void getAllPeopleBySpouseIsEqualToSomething() throws Exception {
        // Initialize the database
        Person spouse = PersonResourceIntTest.createEntity(em);
        em.persist(spouse);
        em.flush();
        person.setSpouse(spouse);
        personRepository.saveAndFlush(person);
        Long spouseId = spouse.getId();

        // Get all the personList where spouse equals to spouseId
        defaultPersonShouldBeFound("spouseId.equals=" + spouseId);

        // Get all the personList where spouse equals to spouseId + 1
        defaultPersonShouldNotBeFound("spouseId.equals=" + (spouseId + 1));
    }


    @Test
    @Transactional
    public void getAllPeopleByPersonIsEqualToSomething() throws Exception {
        // Initialize the database
        Person person = PersonResourceIntTest.createEntity(em);
        em.persist(person);
        em.flush();
        person.setPerson(person);
        personRepository.saveAndFlush(person);
        Long personId = person.getId();

        // Get all the personList where person equals to personId
        defaultPersonShouldBeFound("personId.equals=" + personId);

        // Get all the personList where person equals to personId + 1
        defaultPersonShouldNotBeFound("personId.equals=" + (personId + 1));
    }


    @Test
    @Transactional
    public void getAllPeopleByChildrenIsEqualToSomething() throws Exception {
        // Initialize the database
        Person children = PersonResourceIntTest.createEntity(em);
        em.persist(children);
        em.flush();
        person.addChildren(children);
        personRepository.saveAndFlush(person);
        Long childrenId = children.getId();

        // Get all the personList where children equals to childrenId
        defaultPersonShouldBeFound("childrenId.equals=" + childrenId);

        // Get all the personList where children equals to childrenId + 1
        defaultPersonShouldNotBeFound("childrenId.equals=" + (childrenId + 1));
    }


    @Test
    @Transactional
    public void getAllPeopleBySourceIsEqualToSomething() throws Exception {
        // Initialize the database
        StaticSource source = StaticSourceResourceIntTest.createEntity(em);
        em.persist(source);
        em.flush();
        person.addSource(source);
        personRepository.saveAndFlush(person);
        Long sourceId = source.getId();

        // Get all the personList where source equals to sourceId
        defaultPersonShouldBeFound("sourceId.equals=" + sourceId);

        // Get all the personList where source equals to sourceId + 1
        defaultPersonShouldNotBeFound("sourceId.equals=" + (sourceId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultPersonShouldBeFound(String filter) throws Exception {
        restPersonMockMvc.perform(get("/api/people?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(person.getId().intValue())))
            .andExpect(jsonPath("$.[*].idNumber").value(hasItem(DEFAULT_ID_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].foreNames").value(hasItem(DEFAULT_FORE_NAMES.toString())))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].placeOfBirth").value(hasItem(DEFAULT_PLACE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].placeOfDeath").value(hasItem(DEFAULT_PLACE_OF_DEATH.toString())))
            .andExpect(jsonPath("$.[*].dateOfDeath").value(hasItem(DEFAULT_DATE_OF_DEATH.toString())))
            .andExpect(jsonPath("$.[*].briefNote").value(hasItem(DEFAULT_BRIEF_NOTE.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultPersonShouldNotBeFound(String filter) throws Exception {
        restPersonMockMvc.perform(get("/api/people?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingPerson() throws Exception {
        // Get the person
        restPersonMockMvc.perform(get("/api/people/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePerson() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);
        personSearchRepository.save(person);
        int databaseSizeBeforeUpdate = personRepository.findAll().size();

        // Update the person
        Person updatedPerson = personRepository.findOne(person.getId());
        // Disconnect from session so that the updates on updatedPerson are not directly saved in db
        em.detach(updatedPerson);
        updatedPerson
            .idNumber(UPDATED_ID_NUMBER)
            .surname(UPDATED_SURNAME)
            .foreNames(UPDATED_FORE_NAMES)
            .sex(UPDATED_SEX)
            .placeOfBirth(UPDATED_PLACE_OF_BIRTH)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH)
            .placeOfDeath(UPDATED_PLACE_OF_DEATH)
            .dateOfDeath(UPDATED_DATE_OF_DEATH)
            .briefNote(UPDATED_BRIEF_NOTE)
            .notes(UPDATED_NOTES);
        PersonDTO personDTO = personMapper.toDto(updatedPerson);

        restPersonMockMvc.perform(put("/api/people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isOk());

        // Validate the Person in the database
        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeUpdate);
        Person testPerson = personList.get(personList.size() - 1);
        assertThat(testPerson.getIdNumber()).isEqualTo(UPDATED_ID_NUMBER);
        assertThat(testPerson.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testPerson.getForeNames()).isEqualTo(UPDATED_FORE_NAMES);
        assertThat(testPerson.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testPerson.getPlaceOfBirth()).isEqualTo(UPDATED_PLACE_OF_BIRTH);
        assertThat(testPerson.getDateOfBirth()).isEqualTo(UPDATED_DATE_OF_BIRTH);
        assertThat(testPerson.getPlaceOfDeath()).isEqualTo(UPDATED_PLACE_OF_DEATH);
        assertThat(testPerson.getDateOfDeath()).isEqualTo(UPDATED_DATE_OF_DEATH);
        assertThat(testPerson.getBriefNote()).isEqualTo(UPDATED_BRIEF_NOTE);
        assertThat(testPerson.getNotes()).isEqualTo(UPDATED_NOTES);

        // Validate the Person in Elasticsearch
        Person personEs = personSearchRepository.findOne(testPerson.getId());
        assertThat(personEs).isEqualToIgnoringGivenFields(testPerson);
    }

    @Test
    @Transactional
    public void updateNonExistingPerson() throws Exception {
        int databaseSizeBeforeUpdate = personRepository.findAll().size();

        // Create the Person
        PersonDTO personDTO = personMapper.toDto(person);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPersonMockMvc.perform(put("/api/people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personDTO)))
            .andExpect(status().isCreated());

        // Validate the Person in the database
        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePerson() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);
        personSearchRepository.save(person);
        int databaseSizeBeforeDelete = personRepository.findAll().size();

        // Get the person
        restPersonMockMvc.perform(delete("/api/people/{id}", person.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean personExistsInEs = personSearchRepository.exists(person.getId());
        assertThat(personExistsInEs).isFalse();

        // Validate the database is empty
        List<Person> personList = personRepository.findAll();
        assertThat(personList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPerson() throws Exception {
        // Initialize the database
        personRepository.saveAndFlush(person);
        personSearchRepository.save(person);

        // Search the person
        restPersonMockMvc.perform(get("/api/_search/people?query=id:" + person.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(person.getId().intValue())))
            .andExpect(jsonPath("$.[*].idNumber").value(hasItem(DEFAULT_ID_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].foreNames").value(hasItem(DEFAULT_FORE_NAMES.toString())))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].placeOfBirth").value(hasItem(DEFAULT_PLACE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].placeOfDeath").value(hasItem(DEFAULT_PLACE_OF_DEATH.toString())))
            .andExpect(jsonPath("$.[*].dateOfDeath").value(hasItem(DEFAULT_DATE_OF_DEATH.toString())))
            .andExpect(jsonPath("$.[*].briefNote").value(hasItem(DEFAULT_BRIEF_NOTE.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Person.class);
        Person person1 = new Person();
        person1.setId(1L);
        Person person2 = new Person();
        person2.setId(person1.getId());
        assertThat(person1).isEqualTo(person2);
        person2.setId(2L);
        assertThat(person1).isNotEqualTo(person2);
        person1.setId(null);
        assertThat(person1).isNotEqualTo(person2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonDTO.class);
        PersonDTO personDTO1 = new PersonDTO();
        personDTO1.setId(1L);
        PersonDTO personDTO2 = new PersonDTO();
        assertThat(personDTO1).isNotEqualTo(personDTO2);
        personDTO2.setId(personDTO1.getId());
        assertThat(personDTO1).isEqualTo(personDTO2);
        personDTO2.setId(2L);
        assertThat(personDTO1).isNotEqualTo(personDTO2);
        personDTO1.setId(null);
        assertThat(personDTO1).isNotEqualTo(personDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(personMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(personMapper.fromId(null)).isNull();
    }
}
