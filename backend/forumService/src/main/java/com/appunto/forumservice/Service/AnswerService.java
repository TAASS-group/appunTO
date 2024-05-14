package com.appunto.forumservice.Service;

import com.appunto.forumservice.Models.Answer;
import com.appunto.forumservice.Models.Question;
import com.appunto.forumservice.Repository.AnswerRepository;
import com.appunto.forumservice.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    @Autowired
    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }

    public List<Answer> getAllAnswer() {
        return answerRepository.findAll();
    }

    public void createAnswer(Long questionId, Answer answer) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new IllegalStateException("Question with id " + questionId + " does not exist"));
        question.addAnswer(answer);
        answerRepository.save(answer);
    }

    public List<Answer> getAllAnswerByQuestionId(Long questionId) {
        return answerRepository.findByQuestionId(questionId);

    }

    public void updateAnswer(long answerId) {
        Answer answer = answerRepository.findById(answerId).orElseThrow(() -> new IllegalStateException("Answer with id " + answerId + " does not exist"));
        answer.addUpvote();
        answerRepository.save(answer);
    }

    public void deleteAnswer(Long answerId) {
        boolean exists = answerRepository.existsById(answerId);
        if (!exists) {
            throw new IllegalStateException("Answer with id " + answerId + " does not exist");
        }
        answerRepository.deleteById(answerId);
    }
}
