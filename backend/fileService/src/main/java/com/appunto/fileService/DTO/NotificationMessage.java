package com.appunto.fileService.DTO;

import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationMessage implements Serializable {
    private Long id;
    private String message;
    private String title;
    private long courseId;
    private Date timestamp;
    private boolean seen;

}
