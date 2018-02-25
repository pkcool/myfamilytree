package io.myfamilytree.service.mapper;

import io.myfamilytree.domain.*;
import io.myfamilytree.service.dto.PersonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Person and its DTO PersonDTO.
 */
@Mapper(componentModel = "spring", uses = {StaticSourceMapper.class})
public interface PersonMapper extends EntityMapper<PersonDTO, Person> {

    @Mapping(source = "father.id", target = "fatherId")
    @Mapping(source = "mother.id", target = "motherId")
    @Mapping(source = "spouse.id", target = "spouseId")
    PersonDTO toDto(Person person);

    @Mapping(source = "fatherId", target = "father")
    @Mapping(source = "motherId", target = "mother")
    @Mapping(source = "spouseId", target = "spouse")
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
