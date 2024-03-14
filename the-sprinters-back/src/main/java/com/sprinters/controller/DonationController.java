package com.sprinters.controller;

import com.sprinters.dtos.DonationDto;
import com.sprinters.services.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class DonationController {
    private final DonationService donationService;

    @GetMapping(path = "/donation/{username}")
    public List<DonationDto> getDonations(@PathVariable String username) {
        return donationService.getDonations(username);
    }
    @PostMapping(path = "/donation")
    public DonationDto addDonation(@RequestBody DonationDto donationDto){
        return donationService.addDonation(donationDto);
    }

}
