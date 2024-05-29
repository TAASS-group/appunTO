package com.appunto.fileService.DTO;

import com.appunto.fileService.Models.Commit;
import com.appunto.fileService.Models.MyFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommitWithDiff {
    // commit fields
    private String id;
    private String message;
    private String title;
    private Date createdAt;
    private String authorName;
    private String authorImg;
    private String gitCommitId;
    private String file;

    // diff fields
    String diff;
}
