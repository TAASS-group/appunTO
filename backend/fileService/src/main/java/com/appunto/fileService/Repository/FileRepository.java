package com.appunto.fileService.Repository;

import com.appunto.fileService.Models.MyFile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FileRepository extends MongoRepository<MyFile, String> {
    Optional<MyFile> findByCourseId(String courseId);
}
