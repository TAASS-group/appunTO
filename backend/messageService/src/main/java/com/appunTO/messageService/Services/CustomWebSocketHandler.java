package com.appunTO.messageService.Services;

import com.appunTO.messageService.DTO.NotificationMessage;
import com.appunTO.messageService.Model.Notification;
import com.appunTO.messageService.Repository.NotificationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.WebSocketSession;

import org.springframework.web.socket.TextMessage;
import java.io.IOException;
import java.util.List;


@Slf4j
public class CustomWebSocketHandler extends TextWebSocketHandler {

    private WebSocketMessageBroker broker;
    private NotificationRepository notificationRepository;

    public CustomWebSocketHandler(WebSocketMessageBroker broker, NotificationRepository notificationRepository) {
        log.info("CustomWebSocketHandler created");
        this.broker = broker;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("New connection established");
        //broker.register(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("Connection closed");
        broker.unregister(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        log.info("Binary message received: " + message.getPayload());
        // message: userId: course1 course2 course3
        if (!message.getPayload().contains(":")) {
            log.error("Invalid message format");
            return;
        }

        String[] parts = message.getPayload().split(":", 2);
        if (parts.length < 2 || parts[1].isEmpty()) {
            log.error("Invalid message data");
            return;
        }

        String userId = parts[0].trim();
        String[] courses = parts[1].trim().split("\\s+"); // split by whitespace
        for (String course : courses) {
            // get from db all the not aknowledged messages for the user and the course
            List<Notification> unSeen = notificationRepository.findUnseenNotificationsByCourseAndUser(course, userId);
            List<Notification> seen = notificationRepository.findSeenNotificationsByCourseAndUser(course, userId);
            broker.register(session, course);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);

            // seen messages
            for(Notification notification : seen) {
                // convert to json and send to the user
                NotificationMessage notificationMessage = new NotificationMessage(notification, true);
                String json = objectMapper.writeValueAsString(notificationMessage);
                session.sendMessage(new TextMessage(json));
            }
            // unseen messages
            for (Notification notification : unSeen) {
                // convert to json and send to the user
                NotificationMessage notificationMessage = new NotificationMessage(notification, false);
                String json = objectMapper.writeValueAsString(notificationMessage);
                session.sendMessage(new TextMessage(json));
            }
        }
    }
}
