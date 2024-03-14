package com.sprinters.utils.mapper;

import com.sprinters.dtos.OrganizationDto;
import com.sprinters.model.Organization;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrganizationMapper {

    Organization dtoToEntity(OrganizationDto organizationDto);
    OrganizationDto entityToDto(Organization organization);

    List<Organization> dtoToEntity(List<OrganizationDto> organizationDto);

    List<OrganizationDto> entityToDto(List<Organization> organization);

}
