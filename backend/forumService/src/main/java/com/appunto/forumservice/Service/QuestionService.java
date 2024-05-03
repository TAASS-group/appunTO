package com.appunto.forumservice.Service;

import com.appunto.forumservice.Models.Forum;
import com.appunto.forumservice.Models.Question;
import com.appunto.forumservice.Repository.ForumRepository;
import com.appunto.forumservice.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final ForumRepository forumRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository, ForumRepository forumRepository) {
        this.questionRepository = questionRepository;
        this.forumRepository = forumRepository;
    }

    public List<Question> getAllQuestion() {
        return questionRepository.findAll();
    }


    public void createQuestion(long forumId, Question question) {
        Forum forum = forumRepository.findById(forumId).orElseThrow(() -> new IllegalStateException("Forum with id " + forumId + " does not exist"));
        forum.addQuestion(question);
        questionRepository.save(question);
    }

    public List<Question> getAllQuestionByForumId(Long forumId) {
        return questionRepository.findByForumId(forumId);
    }

    public void deleteQuestion(Long questionId) {
        boolean exists = questionRepository.existsById(questionId);
        if (!exists) {
            throw new IllegalStateException("Question with id " + questionId + " does not exist");
        }
        questionRepository.deleteById(questionId);
    }
}