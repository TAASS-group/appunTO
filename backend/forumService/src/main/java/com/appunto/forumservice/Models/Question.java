package com.appunto.forumservice.Models;



import jakarta.persistence.*;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idUser;
    private String text;
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "forumId")
    private Forum forum;

    public Question() {
    }
    public void addAnswer(Answer answer){
        answer.setQuestion(this);
    }
    public Question(String text, Long idUser) {
        this.text = text;
        this.idUser = idUser;

    }
    public void setForum(Forum forum) {
        this.forum = forum;
    }
    public Long getIdUser() {
        return idUser;
    }
    public String getText() {
        return text;
    }
    public Forum getForum() {
        return forum;
    }
    public Long getId() {
        return id;
    }

}