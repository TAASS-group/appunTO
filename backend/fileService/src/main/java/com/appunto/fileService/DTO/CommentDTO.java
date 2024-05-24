package com.appunto.fileService.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentDTO {
    private String id;
    private String text;
    private String authorName;
    private String authorImg;
    private String createdAt;
}
