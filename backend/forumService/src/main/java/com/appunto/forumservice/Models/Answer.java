package com.appunto.forumservice.Models;

import jakarta.persistence.*;

@Entity
public class Answer{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idUser;
    private String text;
    private int upvotes;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "domanda_id")
    private Question question;

    public Answer(String text, Long idUser) {
        this.text = text;
        this.idUser = idUser;
        this.upvotes = 0;
    }

    public Answer() {

    }
    public void setQuestion(Question question) {
        this.question = question;
    }
    public Long getId() {
        return id;
    }
    public Long getIdUser() {
        return idUser;
    }
    public String getText() {
        return text;
    }

    public void addUpvote() {
        upvotes++;
    }
    public int getUpvotes() {
        return upvotes;
    }
    public Question getQuestion() {
        return question;
    }



}