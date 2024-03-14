package com.sprinters.controller;

import com.sprinters.dtos.CharityCaseDto;
import com.sprinters.model.CharityCase;
import com.sprinters.services.CharityCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/charity-case")
public class CharityCaseController {
    private final CharityCaseService charityCaseService;

    @GetMapping
    public List<CharityCase> getAll(){
        return charityCaseService.getAll();
    }
    @PostMapping
    public CharityCaseDto addCharityCase(@RequestBody CharityCaseDto charityCase){
        return charityCaseService.add(charityCase);
    }
}
