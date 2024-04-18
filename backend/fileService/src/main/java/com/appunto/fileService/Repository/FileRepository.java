package com.appunto.fileService.Repository;

import com.appunto.fileService.Models.MyFile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FileRepository extends MongoRepository<MyFile, String> {
}
