package com.appunTO.messageService.DTO;

import com.appunTO.messageService.Model.Notification;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationMessage implements Serializable {
    private Long id;
    private String message;
    private String title;
    private long courseId;
    private String courseName;
    private Date timestamp;
    private boolean seen;

    public NotificationMessage(Notification notification) {
        this.id = notification.getId();
        this.message = notification.getMessage();
        this.title = notification.getTitle();
        this.courseId = notification.getCourseId();
        this.timestamp = notification.getTimestamp();
    }
    public NotificationMessage(Notification notification, boolean seen, String courseName) {
        this.id = notification.getId();
        this.message = notification.getMessage();
        this.title = notification.getTitle();
        this.courseId = notification.getCourseId();
        this.timestamp = notification.getTimestamp();
        this.seen = seen;
        this.courseName = courseName;
    }

    @Override
    public String toString() {
        return "NotificationMessage{" +
                ", title='" + title + '\'' +
                ", message='" + message + '\'' +
                ", courseId='" + courseId + '\'' +
                '}';
    }
}
