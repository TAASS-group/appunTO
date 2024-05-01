package com.appunTO.messageService.Controllers;

import com.appunTO.messageService.DTO.NotificationMessage;
import com.appunTO.messageService.Services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/message")
public class MessageController {
    private final NotificationService notificationService;

    @Autowired
    public MessageController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping(path = "/send")
    public void sendMessage(@RequestBody NotificationMessage message) {
        notificationService.sendNotification(message);
    }
}
