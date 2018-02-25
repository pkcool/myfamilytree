package io.myfamilytree.web.rest;

import io.myfamilytree.MyfamilytreeApp;

import io.myfamilytree.domain.StaticSource;
import io.myfamilytree.repository.StaticSourceRepository;
import io.myfamilytree.service.StaticSourceService;
import io.myfamilytree.repository.search.StaticSourceSearchRepository;
import io.myfamilytree.service.dto.StaticSourceDTO;
import io.myfamilytree.service.mapper.StaticSourceMapper;
import io.myfamilytree.web.rest.errors.ExceptionTranslator;

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
import java.util.List;

import static io.myfamilytree.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StaticSourceResource REST controller.
 *
 * @see StaticSourceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyfamilytreeApp.class)
public class StaticSourceResourceIntTest {

    private static final String DEFAULT_SOURCE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private StaticSourceRepository staticSourceRepository;

    @Autowired
    private StaticSourceMapper staticSourceMapper;

    @Autowired
    private StaticSourceService staticSourceService;

    @Autowired
    private StaticSourceSearchRepository staticSourceSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStaticSourceMockMvc;

    private StaticSource staticSource;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StaticSourceResource staticSourceResource = new StaticSourceResource(staticSourceService);
        this.restStaticSourceMockMvc = MockMvcBuilders.standaloneSetup(staticSourceResource)
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
    public static StaticSource createEntity(EntityManager em) {
        StaticSource staticSource = new StaticSource()
            .sourcePath(DEFAULT_SOURCE_PATH)
            .comment(DEFAULT_COMMENT);
        return staticSource;
    }

    @Before
    public void initTest() {
        staticSourceSearchRepository.deleteAll();
        staticSource = createEntity(em);
    }

    @Test
    @Transactional
    public void createStaticSource() throws Exception {
        int databaseSizeBeforeCreate = staticSourceRepository.findAll().size();

        // Create the StaticSource
        StaticSourceDTO staticSourceDTO = staticSourceMapper.toDto(staticSource);
        restStaticSourceMockMvc.perform(post("/api/static-sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staticSourceDTO)))
            .andExpect(status().isCreated());

        // Validate the StaticSource in the database
        List<StaticSource> staticSourceList = staticSourceRepository.findAll();
        assertThat(staticSourceList).hasSize(databaseSizeBeforeCreate + 1);
        StaticSource testStaticSource = staticSourceList.get(staticSourceList.size() - 1);
        assertThat(testStaticSource.getSourcePath()).isEqualTo(DEFAULT_SOURCE_PATH);
        assertThat(testStaticSource.getComment()).isEqualTo(DEFAULT_COMMENT);

        // Validate the StaticSource in Elasticsearch
        StaticSource staticSourceEs = staticSourceSearchRepository.findOne(testStaticSource.getId());
        assertThat(staticSourceEs).isEqualToIgnoringGivenFields(testStaticSource);
    }

    @Test
    @Transactional
    public void createStaticSourceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = staticSourceRepository.findAll().size();

        // Create the StaticSource with an existing ID
        staticSource.setId(1L);
        StaticSourceDTO staticSourceDTO = staticSourceMapper.toDto(staticSource);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStaticSourceMockMvc.perform(post("/api/static-sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staticSourceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StaticSource in the database
        List<StaticSource> staticSourceList = staticSourceRepository.findAll();
        assertThat(staticSourceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStaticSources() throws Exception {
        // Initialize the database
        staticSourceRepository.saveAndFlush(staticSource);

        // Get all the staticSourceList
        restStaticSourceMockMvc.perform(get("/api/static-sources?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(staticSource.getId().intValue())))
            .andExpect(jsonPath("$.[*].sourcePath").value(hasItem(DEFAULT_SOURCE_PATH.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }

    @Test
    @Transactional
    public void getStaticSource() throws Exception {
        // Initialize the database
        staticSourceRepository.saveAndFlush(staticSource);

        // Get the staticSource
        restStaticSourceMockMvc.perform(get("/api/static-sources/{id}", staticSource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(staticSource.getId().intValue()))
            .andExpect(jsonPath("$.sourcePath").value(DEFAULT_SOURCE_PATH.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStaticSource() throws Exception {
        // Get the staticSource
        restStaticSourceMockMvc.perform(get("/api/static-sources/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStaticSource() throws Exception {
        // Initialize the database
        staticSourceRepository.saveAndFlush(staticSource);
        staticSourceSearchRepository.save(staticSource);
        int databaseSizeBeforeUpdate = staticSourceRepository.findAll().size();

        // Update the staticSource
        StaticSource updatedStaticSource = staticSourceRepository.findOne(staticSource.getId());
        // Disconnect from session so that the updates on updatedStaticSource are not directly saved in db
        em.detach(updatedStaticSource);
        updatedStaticSource
            .sourcePath(UPDATED_SOURCE_PATH)
            .comment(UPDATED_COMMENT);
        StaticSourceDTO staticSourceDTO = staticSourceMapper.toDto(updatedStaticSource);

        restStaticSourceMockMvc.perform(put("/api/static-sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staticSourceDTO)))
            .andExpect(status().isOk());

        // Validate the StaticSource in the database
        List<StaticSource> staticSourceList = staticSourceRepository.findAll();
        assertThat(staticSourceList).hasSize(databaseSizeBeforeUpdate);
        StaticSource testStaticSource = staticSourceList.get(staticSourceList.size() - 1);
        assertThat(testStaticSource.getSourcePath()).isEqualTo(UPDATED_SOURCE_PATH);
        assertThat(testStaticSource.getComment()).isEqualTo(UPDATED_COMMENT);

        // Validate the StaticSource in Elasticsearch
        StaticSource staticSourceEs = staticSourceSearchRepository.findOne(testStaticSource.getId());
        assertThat(staticSourceEs).isEqualToIgnoringGivenFields(testStaticSource);
    }

    @Test
    @Transactional
    public void updateNonExistingStaticSource() throws Exception {
        int databaseSizeBeforeUpdate = staticSourceRepository.findAll().size();

        // Create the StaticSource
        StaticSourceDTO staticSourceDTO = staticSourceMapper.toDto(staticSource);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStaticSourceMockMvc.perform(put("/api/static-sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staticSourceDTO)))
            .andExpect(status().isCreated());

        // Validate the StaticSource in the database
        List<StaticSource> staticSourceList = staticSourceRepository.findAll();
        assertThat(staticSourceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStaticSource() throws Exception {
        // Initialize the database
        staticSourceRepository.saveAndFlush(staticSource);
        staticSourceSearchRepository.save(staticSource);
        int databaseSizeBeforeDelete = staticSourceRepository.findAll().size();

        // Get the staticSource
        restStaticSourceMockMvc.perform(delete("/api/static-sources/{id}", staticSource.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean staticSourceExistsInEs = staticSourceSearchRepository.exists(staticSource.getId());
        assertThat(staticSourceExistsInEs).isFalse();

        // Validate the database is empty
        List<StaticSource> staticSourceList = staticSourceRepository.findAll();
        assertThat(staticSourceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchStaticSource() throws Exception {
        // Initialize the database
        staticSourceRepository.saveAndFlush(staticSource);
        staticSourceSearchRepository.save(staticSource);

        // Search the staticSource
        restStaticSourceMockMvc.perform(get("/api/_search/static-sources?query=id:" + staticSource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(staticSource.getId().intValue())))
            .andExpect(jsonPath("$.[*].sourcePath").value(hasItem(DEFAULT_SOURCE_PATH.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StaticSource.class);
        StaticSource staticSource1 = new StaticSource();
        staticSource1.setId(1L);
        StaticSource staticSource2 = new StaticSource();
        staticSource2.setId(staticSource1.getId());
        assertThat(staticSource1).isEqualTo(staticSource2);
        staticSource2.setId(2L);
        assertThat(staticSource1).isNotEqualTo(staticSource2);
        staticSource1.setId(null);
        assertThat(staticSource1).isNotEqualTo(staticSource2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StaticSourceDTO.class);
        StaticSourceDTO staticSourceDTO1 = new StaticSourceDTO();
        staticSourceDTO1.setId(1L);
        StaticSourceDTO staticSourceDTO2 = new StaticSourceDTO();
        assertThat(staticSourceDTO1).isNotEqualTo(staticSourceDTO2);
        staticSourceDTO2.setId(staticSourceDTO1.getId());
        assertThat(staticSourceDTO1).isEqualTo(staticSourceDTO2);
        staticSourceDTO2.setId(2L);
        assertThat(staticSourceDTO1).isNotEqualTo(staticSourceDTO2);
        staticSourceDTO1.setId(null);
        assertThat(staticSourceDTO1).isNotEqualTo(staticSourceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(staticSourceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(staticSourceMapper.fromId(null)).isNull();
    }
}
