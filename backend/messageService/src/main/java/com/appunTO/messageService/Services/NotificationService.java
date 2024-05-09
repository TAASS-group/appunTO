package com.appunTO.messageService.Services;

import com.appunTO.messageService.DTO.NotificationMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendNotification(NotificationMessage message) {
       String routingKey = message.getCourseId();
       rabbitTemplate.convertAndSend(RabbitMQService.EXCHANGE, "notification." + routingKey, message);
    }
}
