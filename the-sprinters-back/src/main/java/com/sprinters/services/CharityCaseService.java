package com.sprinters.services;

import com.sprinters.dtos.CharityCaseDto;
import com.sprinters.model.CharityCase;

import java.util.List;

public interface CharityCaseService {
    List<CharityCase> getAll();
    CharityCaseDto add(CharityCaseDto charityCaseDto);
}
