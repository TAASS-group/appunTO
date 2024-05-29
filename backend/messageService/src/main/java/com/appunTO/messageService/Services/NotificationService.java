package com.appunTO.messageService.Services;

import com.appunTO.messageService.DTO.NotificationMessage;
import com.appunTO.messageService.Repository.NotificationRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendNotification(NotificationMessage message) {
       long routingKey = message.getCourseId();
       rabbitTemplate.convertAndSend(RabbitMQService.EXCHANGE, "notification." + routingKey, message);
    }


}
