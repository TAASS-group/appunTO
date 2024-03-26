package com.example.FileService.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "commits")
public class Commit {
    @Id
    private String id;
    private String message;
    private Date createdAt;
    private String author;
    private String gitCommitId;
    @DBRef // reference to the MyFile collection
    private MyFile file;

    public Commit(String message, Date createdAt, String author, MyFile file) {
        this.message = message;
        this.createdAt = createdAt;
        this.author = author;
        this.file = file;
    }
}
