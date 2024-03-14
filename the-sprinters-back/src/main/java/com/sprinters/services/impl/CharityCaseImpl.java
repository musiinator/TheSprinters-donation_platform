package com.sprinters.services.impl;

import com.sprinters.dtos.CharityCaseDto;
import com.sprinters.model.CharityCase;
import com.sprinters.model.Organization;
import com.sprinters.repository.CharityCaseRepository;
import com.sprinters.repository.OrganizationRepository;
import com.sprinters.repository.PersonRepository;
import com.sprinters.repository.UserRepository;
import com.sprinters.services.CharityCaseService;
import com.sprinters.utils.exceptions.NotFoundException;
import com.sprinters.utils.mapper.CharityCaseMapper;
import com.sprinters.utils.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CharityCaseImpl implements CharityCaseService {
    private final CharityCaseRepository charityCaseRepository;
    private final CharityCaseMapper charityCaseMapper;
    private final PersonRepository personRepository;

    private final OrganizationRepository organizationRepository;

    @Override
    public List<CharityCase> getAll() {
        return charityCaseRepository.findAll();
    }

    @Override
    @Transactional
    public CharityCaseDto add(CharityCaseDto charityCaseDto) {
        CharityCase charityCase = charityCaseMapper.dtoToEntity(charityCaseDto);
           Optional<Organization> organization= organizationRepository.findByName(charityCase.getOrganization().getName());
        if(!organization.isPresent())
            throw new NotFoundException("Organization not found");
        charityCase.getPersons().forEach(person -> {
            person.setCharityCase(charityCase);
            personRepository.save(person);
        });
        charityCase.setOrganization(organization.get());
        CharityCase save = charityCaseRepository.save(charityCase);
        return charityCaseMapper.entityToDto(save);
    }
}
