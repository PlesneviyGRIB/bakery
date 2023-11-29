package com.savchenko.backend.controller;

import com.savchenko.backend.dto.TagDto;
import com.savchenko.backend.service.TagService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;
import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping
    public List<TagDto> tags(){
        return tagService.tags();
    }

    @PostMapping
    public TagDto newTag(@RequestParam(name = "title") String title){
        return tagService.create(title);
    }

    @DeleteMapping("/{id}")
    public void deleteTag(@PathVariable(name = "id") Long id){
        tagService.delete(id);
    }
}
