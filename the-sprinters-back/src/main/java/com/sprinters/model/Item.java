package com.sprinters.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item {
    private String name;
    private int quantity;
}
