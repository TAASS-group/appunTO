package com.example.FileService.Controllers;

import com.example.FileService.Models.Comment;
import com.example.FileService.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/comment")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(path = "/get/all")
    public List<Comment> getComments() {
        return commentService.getComments();
    }

    @GetMapping(path = "/delete/all")
    //delete all comments
    public void deleteAll() {
        commentService.deleteAllComments();
    }

    @PostMapping(path = "/add")
    public Comment addComment( @RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    @GetMapping(path = "/getbycommit/{commitId}")
    public List<Comment> getCommentByCommitId(@PathVariable("commitId") String commitId) {
        return commentService.getCommentsByCommitId(commitId);
    }

    @GetMapping(path = "/get/{id}")
    public Comment getCommentById(@PathVariable("id") String id) {
        return commentService.getCommentById(id);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteCommentById(@PathVariable("id") String id) {
        commentService.deleteCommentById(id);
    }

}
