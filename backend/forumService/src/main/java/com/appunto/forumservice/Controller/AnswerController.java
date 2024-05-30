package com.appunto.forumservice.Controller;

import com.appunto.forumservice.DTO.AnswerDTO;
import com.appunto.forumservice.DTO.UserDTO;
import com.appunto.forumservice.Models.Answer;
import com.appunto.forumservice.Service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping ("/answer")
public class AnswerController {

    private final RestTemplate restTemplate;
    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService, RestTemplate restTemplate) {
        this.answerService = answerService;
        this.restTemplate = restTemplate;
    }

    @GetMapping ("/getAll")
    public List<Answer> getAllAnswer() {
        return answerService.getAllAnswer();
    }

    @GetMapping("/getAll/{questionId}")
    public List<AnswerDTO> getAllAnswerByQuestionId(@PathVariable Long questionId) {
        List<AnswerDTO> answerDTOs = new ArrayList<AnswerDTO>();
        List<Answer> answers = answerService.getAllAnswerByQuestionId(questionId);
        answers.forEach(answer -> {
            UserDTO userInformation = restTemplate.getForObject("http://userService/user/info?uid=" + answer.getIdUser(), UserDTO.class);
            assert userInformation != null;
            answerDTOs.add(new AnswerDTO(answer, userInformation.getDisplayName(), userInformation.getPhotoUrl()));
        });
        return answerDTOs;
    }

    @PostMapping("/createAnswer/{questionId}")
    public void createAnswer(@PathVariable Long questionId, @RequestBody Answer answer) {
        answerService.createAnswer(questionId, answer);
    }

    @PutMapping(path = "{answerId}")
    public void updateAnswer(@PathVariable("answerId") long answerId, @RequestParam("likeCount") int likeCount) {
        answerService.updateAnswer(answerId, likeCount);
    }

    @GetMapping(path = "{answerId}")
    public int updateAnswer(@PathVariable("answerId") long answerId) {
       return answerService.getAnswerUpvotes(answerId);
    }

    @DeleteMapping("/deleteAnswer/{answerId}")
    public void deleteAnswer(@PathVariable Long answerId) {
        answerService.deleteAnswer(answerId);
    }
}
