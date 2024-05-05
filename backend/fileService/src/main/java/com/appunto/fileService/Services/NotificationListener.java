package com.appunto.fileService.Services;

import com.appunto.fileService.Config.RabbitListenerConfig;
import com.appunto.fileService.DTO.NotificationMessage;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;


@Component
public class NotificationListener {
    @RabbitListener(queues = "test1.notifications")
    public void receiveNotification(String message) {
        System.out.println("Received notification for test1 course: " + message);
        // Process notification as needed
    }
}


