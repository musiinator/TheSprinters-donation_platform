package com.sprinters.services;


import com.sprinters.dtos.DonationDto;

import java.util.List;

public interface DonationService {
    List<DonationDto> getDonations(String username);
    DonationDto addDonation(DonationDto donationDto);
}
