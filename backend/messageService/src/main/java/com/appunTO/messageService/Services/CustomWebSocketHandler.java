package com.appunTO.messageService.Services;

import com.appunTO.messageService.DTO.NotificationMessage;
import com.appunTO.messageService.Model.Notification;
import com.appunTO.messageService.Repository.NotificationRepository;
import com.appunTO.messageService.Utils.ApiCall;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.WebSocketSession;

import org.springframework.web.socket.TextMessage;
import java.io.IOException;
import java.util.List;
import java.util.Set;


@Slf4j
public class CustomWebSocketHandler extends TextWebSocketHandler {

    private WebSocketMessageBroker broker;
    private NotificationRepository notificationRepository;

    private RestTemplate restTemplate;

    public CustomWebSocketHandler(WebSocketMessageBroker broker, NotificationRepository notificationRepository, RestTemplate restTemplate) {
        log.info("CustomWebSocketHandler created");
        this.broker = broker;
        this.notificationRepository = notificationRepository;
        this.restTemplate = restTemplate;
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
        String userId = message.getPayload();
        log.info("Binary message received: " + userId);

        // call the userService to get the user's courses
        Set<Long> userCourses = ApiCall.getUserCourses(userId, restTemplate);
        if (userCourses == null) {
            log.error("User has no courses");
            return;
        }

        for (Long course : userCourses) {
            // get from db all the not aknowledged messages for the user and the course
            List<Notification> unSeen = notificationRepository.findUnseenNotificationsByCourseAndUser(course, userId);
            List<Notification> seen = notificationRepository.findSeenNotificationsByCourseAndUser(course, userId);
            broker.register(session, course);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
            String courseName = ApiCall.getCourseName(course, restTemplate);

            // seen messages
            for(Notification notification : seen) {
                // convert to json and send to the user
                NotificationMessage notificationMessage = new NotificationMessage(notification, true, courseName);
                String json = objectMapper.writeValueAsString(notificationMessage);
                session.sendMessage(new TextMessage(json));
            }
            // unseen messages
            for (Notification notification : unSeen) {
                // convert to json and send to the user
                NotificationMessage notificationMessage = new NotificationMessage(notification, false, courseName);
                String json = objectMapper.writeValueAsString(notificationMessage);
                session.sendMessage(new TextMessage(json));
            }
        }
    }


}
