package com.appunto.forumservice.Controller;

import com.appunto.forumservice.DTO.QuestionDTO;
import com.appunto.forumservice.DTO.UserDTO;
import com.appunto.forumservice.Models.Question;
import com.appunto.forumservice.Service.ClientService;
import com.appunto.forumservice.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping ("/question")
public class QuestionController {

    private final QuestionService questionService;
    private  final ClientService clientService;

    private final RestTemplate restTemplate;

    @Autowired
    public QuestionController(QuestionService questionService, ClientService clientService, RestTemplate restTemplate) {
        this.questionService = questionService;
        this.clientService = clientService;
        this.restTemplate = restTemplate;

    }

    @GetMapping ("/getAll")
    public List<Question> getAllQuestion() {
        return questionService.getAllQuestion();
    }

    @GetMapping("/getAll/{forumId}")
    public List<QuestionDTO> getAllQuestionByForumId(@PathVariable Long forumId) {
        List<QuestionDTO> questionDTOs = new ArrayList<>();
        List<Question> questions = questionService.getAllQuestionByForumId(forumId);
        questions.forEach(question ->  {
            UserDTO userInformation = restTemplate.getForObject("http://userService/user/info?uid=" + question.getIdUser(), UserDTO.class);
            assert userInformation != null;
            questionDTOs.add(new QuestionDTO(question, userInformation.getDisplayName(), userInformation.getPhotoUrl()));
        });

        return questionDTOs;
    }



    @PostMapping("/createQuestion/{forumId}")
    public Question createQuestion(@PathVariable Long forumId, @RequestBody Question question) {

       return questionService.createQuestion(forumId, question);
    }

    @GetMapping("/getQuestionById/{questionId}")
    public QuestionDTO test(@PathVariable Long questionId) {
      Question question = questionService.getQuestionById(questionId);
      UserDTO userInformation = restTemplate.getForObject("http://userService/user/info?uid=" + question.getIdUser(), UserDTO.class);
      assert userInformation != null;
      return new QuestionDTO(question, userInformation.getDisplayName(), userInformation.getPhotoUrl());

    }

    @DeleteMapping("/deleteQuestion/{questionId}")
    public void deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
    }


}
