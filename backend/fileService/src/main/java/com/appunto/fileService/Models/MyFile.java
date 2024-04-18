package com.appunto.fileService.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data // create all the getters, setters, equals, hash, and toString methods, based on the fields
@Document(collection = "files") // specify the collection name
public class MyFile {
    @Id
    private String id;
    private String path;
    private String courseId;

    public MyFile(String courseId, String path) {
        this.path = path;
        this.courseId = courseId;
    }
}
