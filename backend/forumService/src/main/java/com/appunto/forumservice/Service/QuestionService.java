package com.appunto.forumservice.Service;

import com.appunto.forumservice.DTO.UserDTO;
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
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final ForumRepository forumRepository;
    private final AnswerRepository answerRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository, ForumRepository forumRepository, AnswerRepository answerRepository) {
        this.questionRepository = questionRepository;
        this.forumRepository = forumRepository;
        this.answerRepository = answerRepository;
    }

    public List<Question> getAllQuestion() {
        return questionRepository.findAll();
    }


    public Question createQuestion(long forumId, Question question) {
        Forum forum = forumRepository.findById(forumId).orElseThrow(() -> new IllegalStateException("Forum with id " + forumId + " does not exist"));
        forum.addQuestion(question);
        return questionRepository.save(question);
    }

    public List<Question> getAllQuestionByForumId(Long forumId) {
        return questionRepository.findByForumId(forumId);
    }

    public void deleteQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new IllegalStateException("Question with id " + questionId + " does not exist"));
        List<Answer> answers = answerRepository.findByQuestionId(question.getId());
        for (Answer answer : answers) {
            answer.deleteQuestion();
            answerRepository.deleteById(answer.getId());
        }
        question.deleteForum();
        questionRepository.deleteById(question.getId());
    }

    public Question getQuestionById(Long questionId) {
        return questionRepository.findById(questionId).orElseThrow(() -> new IllegalStateException("Question with id " + questionId + " does not exist"));
    }
}