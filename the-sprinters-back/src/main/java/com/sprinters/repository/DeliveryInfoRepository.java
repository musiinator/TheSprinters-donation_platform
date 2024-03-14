package com.sprinters.repository;

import com.sprinters.model.DeliveryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, UUID> {

}
