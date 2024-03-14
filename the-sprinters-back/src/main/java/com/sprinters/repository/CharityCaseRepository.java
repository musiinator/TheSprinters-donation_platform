package com.sprinters.repository;

import com.sprinters.model.CharityCase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CharityCaseRepository extends JpaRepository<CharityCase, UUID> {
}
