package com.appunto.fileService.Controllers;

import com.appunto.fileService.DTO.CommentDTO;
import com.appunto.fileService.DTO.UserDTO;
import com.appunto.fileService.Models.Comment;
import com.appunto.fileService.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/comment")
public class CommentController {
    private final CommentService commentService;

    private RestTemplate restTemplate;
    // tests


    @Autowired
    public CommentController(CommentService commentService,RestTemplate restTemplate) {
        this.commentService = commentService;
        this.restTemplate = restTemplate;
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
    public CommentDTO addComment(@RequestBody Comment comment) {
        Comment createdComment = commentService.addComment(comment);
        UserDTO user = restTemplate.getForObject("http://userservice/user/info?uid=" + createdComment.getAuthor(), UserDTO.class);
        if(user == null) return null;

        return CommentDTO.builder()
                .id(createdComment.getId())
                .text(createdComment.getText())
                .authorName(user.getDisplayName())
                .authorImg(user.getPhotoUrl())
                .createdAt(createdComment.getCreatedAt().toString())
                .build();
    }

    @GetMapping(path = "/getbycommit/{commitId}")
    public ResponseEntity<List<CommentDTO>> getCommentByCommitId(@PathVariable("commitId") String commitId) {
        List<Comment> comments = commentService.getCommentsByCommitId(commitId);
        List<CommentDTO> result = new ArrayList<>();

        if(comments == null) return ResponseEntity.notFound().build();

        for (Comment comment : comments) {
            UserDTO user = restTemplate.getForObject("http://userservice/user/info?uid=" + comment.getAuthor(), UserDTO.class);
            if(user == null) return ResponseEntity.notFound().build();

            result.add(CommentDTO.builder()
                    .id(comment.getId())
                    .text(comment.getText())
                    .authorName(user.getDisplayName())
                    .authorImg(user.getPhotoUrl())
                    .createdAt(comment.getCreatedAt().toString())
                    .build());
        }

        return ResponseEntity.ok(result);
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
