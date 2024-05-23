package com.appunto.forumservice.Service;

import com.appunto.forumservice.Models.Answer;
import com.appunto.forumservice.Models.Forum;
import com.appunto.forumservice.Models.Question;
import com.appunto.forumservice.Repository.AnswerRepository;
import com.appunto.forumservice.Repository.ForumRepository;
import com.appunto.forumservice.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumService {

    private final ForumRepository forumRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    @Autowired
    public ForumService(ForumRepository forumRepository, QuestionRepository questionRepository, AnswerRepository answerRepository) {
        this.forumRepository = forumRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    public void deleteForum(long forumId) {
        boolean exists = forumRepository.existsById(forumId);
        if (!exists) {
            throw new IllegalStateException("Forum with id " + forumId + " does not exist");
        }
        List<Question> questions = questionRepository.findByForumId(forumId);
        for (Question question : questions) {
            List<Answer> answers = answerRepository.findByQuestionId(question.getId());
            for (Answer answer : answers) {
                answer.deleteQuestion();
                answerRepository.deleteById(answer.getId());
            }
            question.deleteForum();
            questionRepository.deleteById(question.getId());
        }
        forumRepository.deleteById(forumId);
    }


    public List<Forum> getAllForum() {
        return forumRepository.findAll();
    }

    public Forum createForum(Forum forum) {
        return forumRepository.save(forum);
    }

    public Forum getForumByCourseId(Long courseId) {
        return forumRepository.findByCourseId(courseId);
    }
}
