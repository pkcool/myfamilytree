package io.myfamilytree.repository.search;

import io.myfamilytree.domain.Marriage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Marriage entity.
 */
public interface MarriageSearchRepository extends ElasticsearchRepository<Marriage, Long> {
}
