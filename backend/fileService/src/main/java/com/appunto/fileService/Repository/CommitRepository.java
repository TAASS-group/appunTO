package com.appunto.fileService.Repository;

import com.appunto.fileService.Models.Commit;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CommitRepository extends MongoRepository<Commit, String> {
    // find all commits by file id
    Optional<List<Commit>> findCommitsByFile_Id(String fileId);

    // find all commits by file id but from recent to old
    Optional<List<Commit>> findCommitsByFile_IdOrderByCreatedAtDesc(String fileId);

}
