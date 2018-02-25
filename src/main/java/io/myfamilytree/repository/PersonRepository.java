package io.myfamilytree.repository;

import io.myfamilytree.domain.Person;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Person entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonRepository extends JpaRepository<Person, Long>, JpaSpecificationExecutor<Person> {
    @Query("select distinct person from Person person left join fetch person.sources")
    List<Person> findAllWithEagerRelationships();

    @Query("select person from Person person left join fetch person.sources where person.id =:id")
    Person findOneWithEagerRelationships(@Param("id") Long id);

}
