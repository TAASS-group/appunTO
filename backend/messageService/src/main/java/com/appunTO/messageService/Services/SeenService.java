package com.appunTO.messageService.Services;

import com.appunTO.messageService.Model.Notification;
import com.appunTO.messageService.Model.Seen;
import com.appunTO.messageService.Repository.NotificationRepository;
import com.appunTO.messageService.Repository.SeenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeenService {
    @Autowired
    private SeenRepository seenRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    public void acknowledgeNotification(long notificationId, String userId) {
        Notification notification = notificationRepository.findNotificationById(notificationId);
        seenRepository.save(new Seen(notification, userId));
    }
}
