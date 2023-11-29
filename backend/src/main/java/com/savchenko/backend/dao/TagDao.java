package com.savchenko.backend.dao;

import com.savchenko.backend.dao.base.BaseDao;
import com.savchenko.backend.model.Tag;
import com.savchenko.backend.repository.TagRepository;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.savchenko.backend.model.QTag.tag;


@Repository
public class TagDao extends BaseDao<TagRepository, Tag> {
    public List<Pair<Tag, Integer>> tags() {
        // TODO join tag_intermediate for count of tag usages
//        var tagInterim = new PathBuilder<>(Object.class,"tag_interim");
//        var tagId = Expressions.numberPath(Long.class, tagInterim, "tag_id");
//        var productId = Expressions.numberPath(Long.class, tagInterim, "product_id");
//
//        var tuples = query().selectFrom(tag)
//                .select(tag.id, tag.title, productId)
//                .join(tagInterim).on(tag.id.eq(tagId))
//                .fetch();
        var tuples = query().selectFrom(tag).fetch();

        return tuples.stream().map(t -> Pair.of(t, 0)).toList();
    }

    public List<Tag> getAllByIds(List<Long> ids) {
        return query().selectFrom(tag).where(tag.id.in(ids)).fetch();
    }
}