package com.appunto.forumservice.Models;



import jakarta.persistence.*;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String idUser;
    private String text;
    private String topic;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "forumId")
    private Forum forum;

    public Question() {
    }

    public Question(String text, String idUser, String topic) {
        this.text = text;
        this.idUser = idUser;
        this.topic = topic;

    }
    public void setForum(Forum forum) {
        this.forum = forum;
    }

    public void deleteForum() {
        this.forum = null;
    }
    public String getIdUser() {
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

    public String getTopic() {
        return topic;
    }


}