package com.sprinters.model;

import com.sprinters.enums.DeliveryCompany;
import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "delivery_info")
public class DeliveryInfo extends BaseEntity{
    private String name;
    private String address;
    @Enumerated(EnumType.STRING)
    private DeliveryCompany deliveryCompany;

    private String phoneNumber;
}
