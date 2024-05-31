
package com.appunto.fileService.DTO;

import com.appunto.fileService.Models.MyFile;
import com.appunto.fileService.Utils.ListCommitFile;
import lombok.Data;

import java.util.List;
import java.util.Set;
@Data
public class UserFilesDTO {
    String uid;
    private boolean hasFavorites;
    private List<FileContentCourseDTO> favourites;
    private List<RecentChangedDTO> recentChanged;
}