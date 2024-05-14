package com.appunto.fileService.DTO;

import lombok.Data;

@Data
public class UpdateFileDTO {
    private String content;
    private String author;
    private String message;
}
