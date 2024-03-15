package com.example.FileService.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data // create all the getters, setters, equals, hash, and toString methods, based on the fields
@Document(collection = "files") // specify the collection name
public class MyFile {
    @Id
    private String id;
    private String name;
    private String type;
    private String size;
    private String path;

    public MyFile(String name, String type, String size, String path) {
        this.name = name;
        this.type = type;
        this.size = size;
        this.path = path;
    }
}
