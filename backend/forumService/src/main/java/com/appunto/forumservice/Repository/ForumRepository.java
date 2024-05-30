package com.appunto.forumservice.Repository;

import com.appunto.forumservice.Models.Forum;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

public interface ForumRepository extends ListCrudRepository<Forum, Long> {

    @Query("SELECT f FROM Forum f WHERE f.idCourse = ?1")
    Forum findByCourseId(Long courseId);
}
