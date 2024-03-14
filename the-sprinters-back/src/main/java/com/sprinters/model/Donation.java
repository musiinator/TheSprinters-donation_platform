package com.sprinters.model;

import com.sprinters.enums.DeliveryMethod;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "donation")
@Entity
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class Donation extends BaseEntity {
    private String note;
    private LocalDate donationDate;
    private String username;
    @Enumerated(EnumType.STRING)
    private DeliveryMethod deliveryMethod;
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private List<Item> items;
    @ManyToOne
    @JoinColumn(name = "delivery_info_id")
    private DeliveryInfo deliveryInfo;

    @ManyToOne
    @JoinColumn(name = "charity_case_id")
    private CharityCase charityCase;
}
