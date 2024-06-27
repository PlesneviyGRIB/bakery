package com.savchenko.backend.dto.base;

import java.util.List;

public record PageResponseDto<Dto>(List<Dto> list, Integer pageNumber, Integer pageSize, Integer totalPages) {
}
