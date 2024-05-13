package com.appunTO.messageService.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "seen")
@Data
@AllArgsConstructor
public class Seen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "notification_id", nullable = false)
    private Notification notification;

    @Column(name = "user_id", nullable = false)
    private String userId;

    public Seen() {

    }

    public Seen(Notification notification, String userId) {
        this.notification = notification;
        this.userId = userId;
    }


}
