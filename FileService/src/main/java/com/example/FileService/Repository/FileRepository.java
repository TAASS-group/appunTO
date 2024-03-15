package com.example.FileService.Repository;

import com.example.FileService.Models.MyFile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FileRepository extends MongoRepository<MyFile, String> {
}
