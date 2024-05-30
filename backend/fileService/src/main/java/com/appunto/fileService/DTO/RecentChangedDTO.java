package com.appunto.fileService.DTO;

import com.appunto.fileService.Models.Commit;
import com.appunto.fileService.Models.MyFile;
import com.appunto.fileService.Utils.ListCommitFile;
import lombok.Data;

import java.util.List;
import java.util.Set;
@Data
public class RecentChangedDTO {
    private Commit commit;
    private String courseName;
    private UserDTO user;
    private List<String> authors;
}
