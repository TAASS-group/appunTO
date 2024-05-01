package com.appunTO.messageService.Services;

import com.appunTO.messageService.Config.RabbitMqConfig;
import com.appunTO.messageService.DTO.NotificationMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendNotification(NotificationMessage message) {
        rabbitTemplate.convertAndSend(RabbitMqConfig.EXCHANGE, "notification.user", message);
    }
}
