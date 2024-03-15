package com.example.FileService.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "commits")
public class Commit {
    @Id
    private String id;
    private String message;
    private String date;
    private String author;
    @DBRef // reference to the MyFile collection
    private MyFile file;

    public Commit(String message, String date, String author, MyFile file) {
        this.message = message;
        this.date = date;
        this.author = author;
        this.file = file;
    }
}
