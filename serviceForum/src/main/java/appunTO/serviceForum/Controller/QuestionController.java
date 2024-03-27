package appunTO.serviceForum.Controller;

import appunTO.serviceForum.Models.Question;
import appunTO.serviceForum.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/question")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping ("/getAll")
    public List<Question> getAllQuestion() {
        return questionService.getAllQuestion();
    }

    @GetMapping("/getAll/{forumId}")
    public List<Question> getAllQuestionByForumId(@PathVariable Long forumId) {
        return questionService.getAllQuestionByForumId(forumId);
    }

    @PostMapping("/createQuestion/{forumId}")
    public void createQuestion(@PathVariable Long forumId, @RequestBody Question question) {
        questionService.createQuestion(forumId, question);
    }

    @DeleteMapping("/deleteQuestion/{questionId}")
    public void deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
    }


}
