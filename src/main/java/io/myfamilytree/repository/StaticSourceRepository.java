package io.myfamilytree.repository;

import io.myfamilytree.domain.StaticSource;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StaticSource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StaticSourceRepository extends JpaRepository<StaticSource, Long> {

}
