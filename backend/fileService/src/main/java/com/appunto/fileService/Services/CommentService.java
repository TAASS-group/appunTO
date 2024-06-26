package com.appunto.fileService.Services;

import com.appunto.fileService.Models.Comment;
import com.appunto.fileService.Repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    public List<Comment> getComments() {
        return commentRepository.findAll();
    }

    public Comment addComment(Comment comment) {
         return commentRepository.insert(comment);

    }

    //delete all comments
    public void deleteAllComments() {
        commentRepository.deleteAll();
    }

    public List<Comment> getCommentsByCommitId(String commitId) {
        return commentRepository.findCommentsByCommit_Id(commitId).orElse(null);
    }


    public void deleteCommentById(String id) {
        commentRepository.deleteById(id);
    }

    public Comment getCommentById(String id) {
        return commentRepository.findById(id).orElse(null);
    }
}
