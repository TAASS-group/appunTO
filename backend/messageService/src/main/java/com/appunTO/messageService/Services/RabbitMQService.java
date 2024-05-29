package com.appunTO.messageService.Services;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RabbitMQService {
    private final RabbitAdmin rabbitAdmin;
    private final NotificationListener notificationListener;
    public static final String EXCHANGE = "appunto-exchange";
    public static final String ROUTINGKEYPREFIX = "notification.";
    public boolean isExchangeCreated = false;


    public void createExchange() {
        log.info("Creating exchange");
        rabbitAdmin.declareExchange(new DirectExchange(EXCHANGE));
    }

    public void createQueue(long queueName) {
        if(!isExchangeCreated) {
            createExchange();
            isExchangeCreated = true;
        }
        log.info("Creating queue");
        rabbitAdmin.declareQueue(new Queue(String.valueOf(queueName)));
        rabbitAdmin.declareBinding(new Binding(String.valueOf(queueName), Binding.DestinationType.QUEUE, EXCHANGE, ROUTINGKEYPREFIX + queueName, null));
        notificationListener.startListening(queueName);
    }
}
