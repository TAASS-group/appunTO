package com.appunTO.messageService.Config;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {
    public static final String QUEUE = "userNotificationQueue";
    public static final String EXCHANGE = "userNotificationExchange";

    @Bean
    Queue queue() {
        return new Queue(QUEUE, false);
    }

    @Bean
    TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    Binding binding(Queue queue, TopicExchange exchange) {
        // bind the queue to the exchange with a routing key of "notification.#"
        // exchange will route messages with a routing key that starts with "notification."
        return BindingBuilder.bind(queue).to(exchange).with("notification.#");
    }

    @Bean
    public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
