package com.savchenko.backend.service;

import com.savchenko.backend.dto.TagDto;
import com.savchenko.backend.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public List<TagDto> tags() {
        return List.of();

//        return tagRepository.findAll().stream()
//                .sorted()
//                .map(pair -> BakeryConverter.tagModelToDto(pair.getFirst(), pair.getSecond()))
//                .toList();
    }

    public TagDto create(String title) {
//        if (StringUtils.isBlank(title) || title.length() > 64) {
//            throw new BakeryException("invalid.tag.length", 64, title.length());
//        }
//        var tag = tagRepository.save(new Tag(title));
//        return BakeryConverter.tagModelToDto(tag, 0);
        return null;
    }

    public void delete(Long id) {
//        if (!tagRepository.existsById(id)) {
//            throw new NoSuchElementException(Message.format("NoSuchElement.tag", id));
//        }
//        tagRepository.delete(id);
    }
}
