package com.sprinters.services.impl;

import com.sprinters.dtos.DonationDto;
import com.sprinters.model.CharityCase;
import com.sprinters.model.Donation;
import com.sprinters.model.Organization;
import com.sprinters.repository.*;
import com.sprinters.services.DonationService;
import com.sprinters.utils.exceptions.NotFoundException;
import com.sprinters.utils.mapper.DonationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DonationServiceImpl implements DonationService {
    private final DonationRepository donationRepository;
    private final DeliveryInfoRepository deliveryInfoRepository;
    private final CharityCaseRepository charityCaseRepository;
    private final PersonRepository personRepository;
    private final OrganizationRepository organizationRepository;
    private final DonationMapper donationMapper;

    @Override
    public List<DonationDto> getDonations(String username) {
        List<DonationDto> donationDtos = null;
        try {
            List<Donation> byDeliveryInfoUsername = donationRepository.findByUsername(username);
            donationDtos = donationMapper.entityToDto(byDeliveryInfoUsername);
        } catch (Exception e) {
            log.error(String.valueOf(e));
            e.printStackTrace();
        }
        return donationDtos;
    }

    @Override
    @Transactional
    public DonationDto addDonation(DonationDto donationDto) {
        Donation donation = donationMapper.dtoToEntity(donationDto);

        if (donation.getDeliveryInfo() != null) {
            deliveryInfoRepository.save(donation.getDeliveryInfo());
        }

        if (donation.getCharityCase() != null) {
            Optional<Organization> organizationOptional = organizationRepository.findByName(donation.getCharityCase().getOrganization().getName());
            if (organizationOptional.isPresent()) {
                donation.getCharityCase().setOrganization(organizationOptional.get());
                charityCaseRepository.save(donation.getCharityCase());
            } else {
                throw new NotFoundException("Organization not found");
            }
        }
        Donation savedDonation = donationRepository.save(donation);
        return donationMapper.entityToDto(savedDonation);
    }

}
