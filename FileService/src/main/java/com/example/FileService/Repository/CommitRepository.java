package com.example.FileService.Repository;

import com.example.FileService.Models.Commit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommitRepository extends MongoRepository<Commit, String> {
}
