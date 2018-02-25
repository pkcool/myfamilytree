package io.myfamilytree.repository;

import io.myfamilytree.domain.Marriage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Marriage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MarriageRepository extends JpaRepository<Marriage, Long>, JpaSpecificationExecutor<Marriage> {

}
