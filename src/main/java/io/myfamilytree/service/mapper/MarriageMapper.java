package io.myfamilytree.service.mapper;

import io.myfamilytree.domain.*;
import io.myfamilytree.service.dto.MarriageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Marriage and its DTO MarriageDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class})
public interface MarriageMapper extends EntityMapper<MarriageDTO, Marriage> {

    @Mapping(source = "male.id", target = "maleId")
    @Mapping(source = "female.id", target = "femaleId")
    MarriageDTO toDto(Marriage marriage);

    @Mapping(source = "maleId", target = "male")
    @Mapping(source = "femaleId", target = "female")
    Marriage toEntity(MarriageDTO marriageDTO);

    default Marriage fromId(Long id) {
        if (id == null) {
            return null;
        }
        Marriage marriage = new Marriage();
        marriage.setId(id);
        return marriage;
    }
}
