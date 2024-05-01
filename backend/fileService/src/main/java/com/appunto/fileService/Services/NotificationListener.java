package com.appunto.fileService.Services;

import com.appunto.fileService.Config.RabbitListenerConfig;
import com.appunto.fileService.DTO.NotificationMessage;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;


@Component
public class NotificationListener {
        @RabbitListener(queues = RabbitListenerConfig.QUEUE)
        public void handleMessage(NotificationMessage message) {
            System.out.println("Received notification: " + message);
            // Implement logic to handle message, e.g., sending it to the frontend via WebSocket
        }
}


