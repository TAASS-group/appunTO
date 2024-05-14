package com.appunto.fileService.Repository;

import com.appunto.fileService.Models.Commit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommitRepository extends MongoRepository<Commit, String> {
}
