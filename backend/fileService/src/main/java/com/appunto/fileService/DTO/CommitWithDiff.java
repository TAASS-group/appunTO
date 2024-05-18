package com.appunto.fileService.DTO;

import com.appunto.fileService.Models.Commit;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommitWithDiff {
    Commit commit;
    String diff;
}
