package com.savchenko.backend.dto.filter;

import com.savchenko.backend.enums.ProductCategory;
import com.savchenko.backend.enums.ProductOrder;

import java.util.List;

public class ProductFilterDto extends FilterDto {
    public String keyword;
    public ProductCategory category;
    public List<OrderDto<ProductOrder>> order;
}
