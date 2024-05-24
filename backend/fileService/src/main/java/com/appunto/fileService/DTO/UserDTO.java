package com.appunto.fileService.DTO;

import lombok.Data;
import java.util.Set;
@Data
public class UserDTO {
    String uid;
    private String displayName;
    private String email;
    private String phoneNumber;
    private String photoUrl;
    private String bio;
    Set<Long> enrolledCourses;
}
