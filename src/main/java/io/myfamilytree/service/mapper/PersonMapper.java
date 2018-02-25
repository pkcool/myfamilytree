package io.myfamilytree.service.mapper;

import io.myfamilytree.domain.*;
import io.myfamilytree.service.dto.PersonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Person and its DTO PersonDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PersonMapper extends EntityMapper<PersonDTO, Person> {

    @Mapping(source = "father.id", target = "fatherId")
    @Mapping(source = "mother.id", target = "motherId")
    @Mapping(source = "spouse.id", target = "spouseId")
    @Mapping(source = "person.id", target = "personId")
    PersonDTO toDto(Person person);

    @Mapping(source = "fatherId", target = "father")
    @Mapping(source = "motherId", target = "mother")
    @Mapping(source = "spouseId", target = "spouse")
    @Mapping(source = "personId", target = "person")
    @Mapping(target = "children", ignore = true)
    @Mapping(target = "sources", ignore = true)
    Person toEntity(PersonDTO personDTO);

    default Person fromId(Long id) {
        if (id == null) {
            return null;
        }
        Person person = new Person();
        person.setId(id);
        return person;
    }
}
