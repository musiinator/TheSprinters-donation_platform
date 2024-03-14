package com.sprinters.controller;

import com.sprinters.dtos.OrganizationDto;
import com.sprinters.services.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class OrganizationController {
    private final OrganizationService organizationService;

    @PostMapping
    public OrganizationDto addOrganization(@RequestBody OrganizationDto charityCase){
        return organizationService.add(charityCase);
    }

    @GetMapping(path = "/organization/{name}")
    public OrganizationDto getOrganization(@PathVariable String name) {
        return organizationService.getOrganization(name);
    }

    @GetMapping(path = "/organization")
    public List<OrganizationDto> getAllOrganizations() {
        return organizationService.getAllOrganization();
    }
}
