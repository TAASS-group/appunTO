package appunTO.serviceForum.Controller;

import appunTO.serviceForum.Models.Forum;
import appunTO.serviceForum.Repository.ForumRepository;
import appunTO.serviceForum.Service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/forum")
public class ForumController {
    private final ForumService forumService;

    @Autowired
    public ForumController(ForumService forumService) {
        this.forumService = forumService;
    }

    @GetMapping ("/getAll")
    public List<Forum> getAllForum() {
        return forumService.getAllForum();
    }

    @PostMapping("/createForum")
    public Forum createForum(@RequestBody Forum forum) {
        return forumService.createForum(forum);
    }

    @DeleteMapping("/deleteForum/{forumId}")
    public void deleteForum(@PathVariable Long forumId) {
        forumService.deleteForum(forumId);
    }




}
