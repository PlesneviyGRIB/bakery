package com.savchenko.backend.dto;

import java.util.List;

public record PageResponseDto<T>(List<T> list, Long pageNumber, Long pageSize, Long totalPages, Long totalCount) {
}
