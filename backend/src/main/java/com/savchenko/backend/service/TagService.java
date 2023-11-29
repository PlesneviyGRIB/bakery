package com.savchenko.backend.service;

import com.savchenko.backend.dao.TagDao;
import com.savchenko.backend.dto.TagDto;
import com.savchenko.backend.exception.BakeryException;
import com.savchenko.backend.model.Tag;
import com.savchenko.backend.service.supportive.BakeryConverter;
import com.savchenko.backend.utils.Message;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TagService {

    @Autowired
    private TagDao tagDao;

    @Transactional
    public List<TagDto> tags() {
        return tagDao.tags().stream()
                .sorted((p1, p2) -> p1.getFirst().compareTo(p2.getFirst()))
                .map(pair -> BakeryConverter.tagModelToDto(pair.getFirst(), pair.getSecond()))
                .toList();
    }

    @Transactional
    public TagDto create(String title) {
        if (StringUtils.isBlank(title) || title.length() > 64) {
            throw new BakeryException("invalid.tag.length", 64, title.length());
        }
        var tag = tagDao.save(new Tag(title));
        return BakeryConverter.tagModelToDto(tag, 0);
    }

    @Transactional
    public void delete(Long id) {
        if (!tagDao.existsById(id)) {
            throw new NoSuchElementException(Message.format("NoSuchElement.tag", id));
        }
        tagDao.delete(id);
    }
}
