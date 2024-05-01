package com.appunTO.messageService.DTO;

import java.io.Serializable;

public class NotificationMessage implements Serializable {
    // Getters and setters
    private String userId;
    private String message;
    private String title;

    // Constructors
    public NotificationMessage() {
    }

    public NotificationMessage(String userId, String title, String message) {
        this.userId = userId;
        this.title = title;
        this.message = message;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public String getTitle() {
        return title;
    }

    // toString method for logging purposes
    @Override
    public String toString() {
        return "NotificationMessage{" +
                "userId='" + userId + '\'' +
                ", title='" + title + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
