package com.sprinters.services;

import com.sprinters.dtos.OrganizationDto;

import java.util.List;

public interface OrganizationService {
    OrganizationDto add(OrganizationDto organization);
    OrganizationDto getOrganization(String name);
    List<OrganizationDto> getAllOrganization();
}
