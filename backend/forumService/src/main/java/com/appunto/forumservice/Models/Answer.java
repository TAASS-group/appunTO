package com.appunto.forumservice.Models;

import jakarta.persistence.*;

@Entity
public class Answer{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String idUser;
    private String text;
    private int upvotes;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "domanda_id")
    private Question question;

    public Answer(String text, String idUser) {
        this.text = text;
        this.idUser = idUser;
        this.upvotes = 0;
    }

    public Answer() {

    }
    public void setQuestion(Question question) {
        this.question = question;
    }

    public void deleteQuestion() {
        this.question = null;
    }
    public Long getId() {
        return id;
    }
    public String getIdUser() {
        return idUser;
    }
    public String getText() {
        return text;
    }

    public void addUpvote() {
        upvotes++;
    }

    public void setUpvotes(int upvotes) {
        this.upvotes = upvotes;
    }
    public int getUpvotes() {
        return upvotes;
    }
    public Question getQuestion() {
        return question;
    }



}