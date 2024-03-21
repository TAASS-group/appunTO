package com.example.FileService.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // create all the getters, setters, equals, hash, and toString methods, based on the fields
@Document(collection = "comments") // specify the collection name
public class Comment {
    @Id
    private String id;
    private String author;
    private String text;
    @DBRef // reference to the MyFile collection
    private Commit commit;

    public Comment(String author, String text, Commit commit) {
        this.author = author;
        this.text = text;
        this.commit = commit;
    }
}
