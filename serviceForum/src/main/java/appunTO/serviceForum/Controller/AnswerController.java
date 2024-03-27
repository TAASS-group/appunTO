package appunTO.serviceForum.Controller;

import appunTO.serviceForum.Models.Answer;
import appunTO.serviceForum.Service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/answer")
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping ("/getAll")
    public List<Answer> getAllAnswer() {
        return answerService.getAllAnswer();
    }

    @GetMapping("/getAll/{questionId}")
    public List<Answer> getAllAnswerByQuestionId(@PathVariable Long questionId) {
        return answerService.getAllAnswerByQuestionId(questionId);
    }

    @PostMapping("/createAnswer/{questionId}")
    public void createAnswer(@PathVariable Long questionId, @RequestBody Answer answer) {
        answerService.createAnswer(questionId, answer);
    }

    @PutMapping(path = "{answerId}")
    public void updateAnswer(@PathVariable("answerId") long answerId) {
        answerService.updateAnswer(answerId);
    }

    @DeleteMapping("/deleteAnswer/{answerId}")
    public void deleteAnswer(@PathVariable Long answerId) {
        answerService.deleteAnswer(answerId);
    }
}
