package com.appunTO.messageService.Controllers;

import com.appunTO.messageService.DTO.AcknowledgeMessageDTO;
import com.appunTO.messageService.DTO.CreateQueueDTO;
import com.appunTO.messageService.DTO.NotificationMessage;
import com.appunTO.messageService.Services.NotificationService;
import com.appunTO.messageService.Services.RabbitMQService;
import com.appunTO.messageService.Services.SeenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/message")
public class MessageController {
    private final NotificationService notificationService;
    private final SeenService seenService;
    private final RabbitMQService rabbitMQService;

    @Autowired
    public MessageController(NotificationService notificationService, RabbitMQService rabbitMQService, SeenService seenService) {
        this.notificationService = notificationService;
        this.rabbitMQService = rabbitMQService;
        this.seenService = seenService;
    }

    @PostMapping(path = "/send")
    public void sendMessage(@RequestBody NotificationMessage message) {
        notificationService.sendNotification(message);
    }

    @PostMapping(path = "/ackowledge")
    public void acknowledgeMessage(@RequestBody AcknowledgeMessageDTO ack) {
        seenService.acknowledgeNotification(ack.getNotificationId(), ack.getUserId());
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
