package io.myfamilytree.repository.search;

import io.myfamilytree.domain.StaticSource;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the StaticSource entity.
 */
public interface StaticSourceSearchRepository extends ElasticsearchRepository<StaticSource, Long> {
}
