package io.myfamilytree.service.mapper;

import io.myfamilytree.domain.*;
import io.myfamilytree.service.dto.StaticSourceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity StaticSource and its DTO StaticSourceDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class})
public interface StaticSourceMapper extends EntityMapper<StaticSourceDTO, StaticSource> {

    @Mapping(source = "person.id", target = "personId")
    StaticSourceDTO toDto(StaticSource staticSource);

    @Mapping(source = "personId", target = "person")
    StaticSource toEntity(StaticSourceDTO staticSourceDTO);

    default StaticSource fromId(Long id) {
        if (id == null) {
            return null;
        }
        StaticSource staticSource = new StaticSource();
        staticSource.setId(id);
        return staticSource;
    }
}
