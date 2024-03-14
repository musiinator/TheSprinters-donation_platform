package com.sprinters.dtos;

import com.sprinters.enums.DeliveryMethod;
import com.sprinters.model.DeliveryInfo;
import com.sprinters.model.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DonationDto {
    private String note;
    private LocalDate donationDate;
    private DeliveryMethod deliveryMethod;
    private List<Item> items;
    private DeliveryInfo deliveryInfo;
    private CharityCaseDto charityCase;
}
