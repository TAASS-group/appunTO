package com.appunto.forumservice.DTO;

import com.appunto.forumservice.Models.Question;

public class QuestionDTO {

    private Question question;
    private String username;
    private String imageUrl;

    public QuestionDTO(Question question, String username, String imageUrl) {
        this.question = question;
        this.username = username;
        this.imageUrl = imageUrl;
    }

    public Question getQuestion() {
        return question;
    }

    public String getUsername() {
        return username;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


}
