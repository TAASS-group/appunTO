package com.appunTO.messageService.Services;

import com.appunTO.messageService.DTO.NotificationMessage;
import com.appunTO.messageService.Model.Notification;
import com.appunTO.messageService.Repository.NotificationRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.MessageListener;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.AbstractMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.RabbitListenerContainerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistry;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.stereotype.Service;

@Service
public class NotificationListener {
    @Autowired
    private WebSocketMessageBroker broker;
    @Autowired
    @Qualifier("rabbitListenerEndpointRegistry")
    private RabbitListenerEndpointRegistry registry;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ConnectionFactory connectionFactory;  // Inietta la ConnectionFactory

    public void startListening(String queueName) {
        System.out.println("Listening to queue: " + queueName);
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames(queueName);
        container.setMessageListener(new MessageListenerAdapter(new MessageListener() {
            @Override
            public void onMessage(org.springframework.amqp.core.Message message) {
                String messageBody = new String(message.getBody());

                // read json message
                ObjectMapper objectMapper = new ObjectMapper();
                Notification notification = null;
                try {
                    notification = objectMapper.readValue(messageBody, Notification.class);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                // save message to database
                if (notification != null) {
                    notificationRepository.save(notification);
                    NotificationMessage notificationMessage = new NotificationMessage(notification);
                    try {
                        String notificationJson = objectMapper.writeValueAsString(notificationMessage);
                        broker.broadcastToCourse(notificationJson, queueName);
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                }

            }
        }));
        container.start();
    }


    public void stopListening(String containerId) {
        registry.getListenerContainer(containerId).stop();
    }
}
