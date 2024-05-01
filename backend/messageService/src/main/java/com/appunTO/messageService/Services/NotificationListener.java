package com.appunTO.messageService.Services;

import com.appunTO.messageService.Config.RabbitMqConfig;
import com.appunTO.messageService.DTO.NotificationMessage;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;


@Component
public class NotificationListener {
//        @RabbitListener(queues = RabbitMqConfig.QUEUE)
//        public void handleMessage(NotificationMessage message) {
//            System.out.println("Received notification: " + message);
//            // Implement logic to handle message, e.g., sending it to the frontend via WebSocket
//        }
}


