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
    public static final String EXCHANGE = "appunto-exchange";
    public void createExchange() {
        log.info("Creating exchange");
        rabbitAdmin.declareExchange(new DirectExchange(EXCHANGE));
    }

    public void createQueue(String queueName, String exchangeName, String routingKey) {
        log.info("Creating queue");
        rabbitAdmin.declareQueue(new Queue(queueName));
        rabbitAdmin.declareBinding(new Binding(queueName, Binding.DestinationType.QUEUE, exchangeName, routingKey, null));
    }
}
