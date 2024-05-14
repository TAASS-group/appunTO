package com.appunto.forumservice.Repository;

import com.appunto.forumservice.Models.Answer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface AnswerRepository extends ListCrudRepository<Answer, Long> {

    @Query("SELECT a FROM Answer a WHERE a.question.id = ?1")
    List<Answer> findByQuestionId(Long questionId);
}
