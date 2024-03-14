package com.sprinters.utils.mapper;

import com.sprinters.dtos.DonationDto;
import com.sprinters.model.Donation;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CharityCaseMapper.class})
public interface DonationMapper {
    DonationDto entityToDto(Donation donation);

    List<DonationDto> entityToDto(List<Donation> donations);
    Donation dtoToEntity(DonationDto donationDto);
}
