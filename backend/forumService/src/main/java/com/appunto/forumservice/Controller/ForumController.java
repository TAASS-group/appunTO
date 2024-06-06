package com.appunto.forumservice.Controller;

import com.appunto.forumservice.Models.Forum;
import com.appunto.forumservice.Service.ForumService;
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

    @PostMapping("/createForum/{courseId}")
    public Forum createForum(@PathVariable Long courseId,@RequestParam String name) {
        return forumService.createForum(courseId, name);
    }

    @DeleteMapping("/deleteForum/{forumId}")
    public void deleteForum(@PathVariable Long forumId) {
        forumService.deleteForum(forumId);
    }

    @GetMapping("/getForumByCourseId/{courseId}")
    public Forum getForumByCourseId(@PathVariable Long courseId) {
        return forumService.getForumByCourseId(courseId);
    }




}
