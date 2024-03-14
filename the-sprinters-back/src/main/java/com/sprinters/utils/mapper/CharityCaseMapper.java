package com.sprinters.utils.mapper;

import com.sprinters.dtos.CharityCaseDto;
import com.sprinters.dtos.OrganizationDto;
import com.sprinters.model.CharityCase;
import com.sprinters.model.Organization;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CharityCaseMapper {
    CharityCase dtoToEntity(CharityCaseDto charityCaseDto);
    CharityCaseDto entityToDto(CharityCase charityCase);

    List<CharityCase> dtoToEntity(List<CharityCaseDto> charityCaseDto);

    List<CharityCaseDto> entityToDto(List<CharityCase> charityCase);
}
