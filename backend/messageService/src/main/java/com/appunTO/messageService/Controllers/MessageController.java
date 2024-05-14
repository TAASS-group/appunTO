package com.appunTO.messageService.Controllers;

import com.appunTO.messageService.DTO.CreateQueueDTO;
import com.appunTO.messageService.DTO.NotificationMessage;
import com.appunTO.messageService.Services.NotificationService;
import com.appunTO.messageService.Services.RabbitMQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/message")
public class MessageController {
    private final NotificationService notificationService;
    private final RabbitMQService rabbitMQService;

    @Autowired
    public MessageController(NotificationService notificationService, RabbitMQService rabbitMQService) {
        this.notificationService = notificationService;
        this.rabbitMQService = rabbitMQService;
    }

    @PostMapping(path = "/send")
    public void sendMessage(@RequestBody NotificationMessage message) {
        notificationService.sendNotification(message);
    }

    @PostMapping(path = "/createExchange")
    public void createExchange() {
        rabbitMQService.createExchange();
    }

    @PostMapping(path = "/createQueue")
    public void createExchange(@RequestBody CreateQueueDTO createQueueDTO) {
        rabbitMQService.createQueue(createQueueDTO.getQueueName(), createQueueDTO.getExchangeName(), createQueueDTO.getRoutingKey());
    }

}
