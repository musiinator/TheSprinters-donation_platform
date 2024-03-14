package com.sprinters.services.impl;

import com.sprinters.dtos.OrganizationDto;
import com.sprinters.model.Organization;
import com.sprinters.repository.OrganizationRepository;
import com.sprinters.services.OrganizationService;
import com.sprinters.utils.exceptions.NotFoundException;
import com.sprinters.utils.exceptions.SprintersException;
import com.sprinters.utils.mapper.OrganizationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final OrganizationMapper organizationMapper;

    @Override
    public OrganizationDto add(OrganizationDto organization) {
        Optional<Organization> organizationOpt = organizationRepository.findByName(organization.getName());
        if (organizationOpt.isPresent())
            throw new SprintersException("Organization already exists");
        if (organization.getName().isEmpty())
            throw new SprintersException("Organization name is empty");

        organizationRepository.save(organizationMapper.dtoToEntity(organization));
       return organization;
    }

    @Override
    public OrganizationDto getOrganization(String organizationName) {
        Optional<Organization> organizationOpt = organizationRepository.findByName(organizationName);
        Organization organization = organizationOpt.orElseThrow(() -> new NotFoundException("Organization not found"));
        return organizationMapper.entityToDto(organization);
    }

    @Override
    public List<OrganizationDto> getAllOrganization() {
        List<Organization> organizationList = organizationRepository.findAll();
        if (organizationList.isEmpty())
            throw new NotFoundException("No organizations found");
        return organizationMapper.entityToDto(organizationList);
    }
}
