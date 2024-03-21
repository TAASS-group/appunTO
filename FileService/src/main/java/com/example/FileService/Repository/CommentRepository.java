package com.example.FileService.Repository;

import com.example.FileService.Models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CommentRepository extends MongoRepository<Comment, String> {
    Optional<Comment> findCommentsByCommit_Id(String commitId);

}