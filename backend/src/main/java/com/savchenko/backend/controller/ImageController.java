package com.savchenko.backend.controller;

import com.savchenko.backend.dto.image.ImageCreateOrUpdateDto;
import com.savchenko.backend.dto.image.ImageDto;
import com.savchenko.backend.enums.ImageQuality;
import com.savchenko.backend.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping("/{id}/{quality}")
    public byte[] get(@PathVariable("id") Long id,
                      @PathVariable("quality") ImageQuality quality) {
        return imageService.get(id, quality);
    }

    @PostMapping
    public ImageDto create(@RequestBody @Validated ImageCreateOrUpdateDto updateDto,
                           @RequestBody MultipartFile multipartFile) {
        return imageService.create(updateDto, multipartFile);
    }

    @PutMapping("/{id}")
    public ImageDto update(@PathVariable("id") Long id,
                           @RequestBody @Validated ImageCreateOrUpdateDto updateDto) {
        return imageService.update(id, updateDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        imageService.delete(id);
    }

}
